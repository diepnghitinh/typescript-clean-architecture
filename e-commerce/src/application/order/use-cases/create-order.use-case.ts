import { Inject, Injectable } from '@nestjs/common';
import { Result } from '@shared/logic/result';
import { OrderEntity } from '../domain/entities/order.entity';
import { IOrderRepository } from '../repositories/order.repository';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { ICommand, IUsecaseExecute } from '@core/interfaces/application.interface';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { IProductRepository } from '@application/product/repositories/product.repository';
import { OrderStatus } from '@application/order/domain/entities/order.props';
import { OrderItemEntity } from '@application/order/domain/entities/order-item.entity';
import { OrderFactory } from '@application/order/factories/order.factory';
import { IEventStoreRepository } from '@infrastructure/eventstore/repositories/event-store.responsity.interface';
import { UniqueEntityID } from '@core/domain';
import { IPublishEndpoint } from 'nestjs-bustransit';
import { SagaMapper } from '@shared/events/saga.mapper';

export class CreateOrderUseCaseCommand implements ICommand {
	constructor(public readonly userId: string, public readonly input: CreateOrderDTO) {}
}

@Injectable()
export class CreateOrderUseCase implements IUsecaseExecute<CreateOrderUseCaseCommand, Result<OrderEntity>> {
    constructor(
        @Inject(IOrderRepository)
        private readonly orderRepository: IOrderRepository,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IProductRepository)
        private readonly productRepository: IProductRepository,
        @Inject(IPublishEndpoint)
        private readonly publishEndpoint: IPublishEndpoint,
        private readonly eventStoreService: IEventStoreRepository,
    ) {}

    async execute( command: CreateOrderUseCaseCommand ): Promise<Result<OrderEntity>> {
        if (!command.input.items.length) {
            throw new Error('Order must have at least one item');
        }

        try {
            const orderFactory = new OrderFactory(this.orderRepository, this.productRepository);

            const customerOrError = await this.getCustomer(command.userId);
            const [productsOrError, totalPrice] = (
                await this.getProductsAndTotalPrice(command.input)
            ).getValue();

            const orderOrError = await OrderEntity.create({
                id: new UniqueEntityID(),
                customerId: customerOrError.getValue(),
                status: OrderStatus.PENDING,
                totalPrice: totalPrice,
                shippingAddress: command.input.shippingAddress,
                paymentMethod: command.input.paymentMethod,
                items: [],
            });

            // Add items to calculate total amount
            command.input.items.forEach((item) =>
                orderOrError.getValue().addItem(
                    OrderItemEntity.create({
                        orderId: orderOrError.getValue().id.toString(),
                        price: productsOrError[item.productId].price,
                        quantity: item.quantity,
                        productId: item.productId,
                    }).getValue(),
                ),
            );

            await orderFactory.create(orderOrError.getValue());

            // Publish Domain Events to Event saga
            const events = orderOrError.getValue().commit();
            events.forEach((event) => {
                if (SagaMapper[event.constructor.name])
                    this.publishEndpoint.Publish( new SagaMapper[event.constructor.name](event) );
            });

            // Bulk save events to event store
            const aggregateId = orderOrError.getValue().id.toString();
            const aggregateType = 'Order';
            let version = 1;
            const eventEntities = events.map((event) => ({
                aggregate_id: aggregateId,
                aggregate_type: aggregateType,
                event_type: event.constructor.name,
                event_data: event,
                version: version++,
            }));
            await this.eventStoreService.saveEvents(eventEntities);

            return Result.ok<OrderEntity>(orderOrError.getValue());
        } catch (err) {
            return Result.fail<OrderEntity>(err);
        }
    }

    private async getCustomer(userId: string): Promise<Result<string>> {
        const user = await this.userRepository.findById(userId);
        return Result.ok<string>(user.customerId);
    }

    private async getProductsAndTotalPrice(input: CreateOrderDTO): Promise<Result<[any, number]>> {
        let totalPrice = 0;
        const productsMap = {};
        const products = await this.productRepository.findByIds(
            input.items.map((item) => item.productId),
        );
        products.forEach((product) => {
            productsMap[product.id.toString()] = product;
        });
        input.items.forEach((item) => {
            const productPrice = Number(productsMap[item.productId].price);
            totalPrice += item.quantity * productPrice;
        });
        return Result.ok<[any, number]>([productsMap, totalPrice]);
    }
}
