import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../domain/entities/order.entity';
import { IOrderRepository } from '../repositories/order.repository';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { OrderStatus } from '../domain/entities/order.props';

@Injectable()
export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(data: CreateOrderDTO): Promise<OrderEntity> {
        if (!data.items.length) {
            throw new Error('Order must have at least one item');
        }

        const order = OrderEntity.create({
            ...data,
            status: OrderStatus.PENDING,
            totalAmount: 0, // Will be calculated by the entity
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Add items to calculate total amount
        data.items.forEach((item) => order.getValue().addItem(item));

        await this.orderRepository.save(order.getValue());
        return order.getValue();
    }
}
