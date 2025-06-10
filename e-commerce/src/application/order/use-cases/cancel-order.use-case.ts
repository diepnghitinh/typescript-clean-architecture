import { OrderEntity } from '../domain/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../domain/entities/order.props';

export class CancelOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<OrderEntity> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status === OrderStatus.DELIVERED) {
            throw new Error('Cannot cancel a delivered order');
        }

        if (order.status === OrderStatus.CANCELLED) {
            throw new Error('Order is already cancelled');
        }

        order.updateStatus(OrderStatus.CANCELLED);
        await this.orderRepository.update(order);
        return order;
    }
}
