import { Inject, Injectable } from '@nestjs/common';
import { Result } from '@shared/logic/result';
import { OrderEntity } from '../domain/entities/order.entity';
import { IOrderRepository } from '../repositories/order.repository';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { IUsecaseExecute } from '@shared/interfaces/application.interface';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { IProductRepository } from '@application/product/repositories/product.repository';
import { OrderStatus } from '@application/order/domain/entities/order.props';
import { OrderItemEntity } from '@application/order/domain/entities/order-item.entity';
import { OrderFactory } from '@application/order/factories/order.factory';
import { UniqueEntityID } from '@core/domain';
import { IPublishEndpoint } from 'nestjs-bustransit';
import { SagaMapper } from '@shared/events/saga.mapper';

@Injectable()
export class CreateOrderUseCase implements IUsecaseExecute<string, Result<OrderEntity>> {
    constructor(
        @Inject(IOrderRepository)
        private readonly orderRepository: IOrderRepository,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IProductRepository)
        private readonly productRepository: IProductRepository,
        @Inject(IPublishEndpoint)
        private readonly publishEndpoint: IPublishEndpoint,
    ) {}

    async execute(userId: string, input: CreateOrderDTO): Promise<Result<OrderEntity>> {
        if (!input.items.length) {
            throw new Error('Order must have at least one item');
        }

        try {
            const orderFactory = new OrderFactory(this.orderRepository, this.productRepository);

            const customerOrError = await this.getCustomer(userId);
            const [productsOrError, totalPrice] = (
                await this.getProductsAndTotalPrice(input)
            ).getValue();

            const orderOrError = await OrderEntity.create({
                id: new UniqueEntityID(),
                customerId: customerOrError.getValue(),
                status: OrderStatus.PENDING,
                totalPrice: totalPrice,
                shippingAddress: input.shippingAddress,
                paymentMethod: input.paymentMethod,
                items: [],
            });

            // Add items to calculate total amount
            input.items.forEach((item) =>
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
            orderOrError
                .getValue()
                .commit()
                .forEach((event) => {
                    if (SagaMapper[event.constructor.name])
                        this.publishEndpoint.Publish( new SagaMapper[event.constructor.name](
                            event
                        ) );
                });

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
