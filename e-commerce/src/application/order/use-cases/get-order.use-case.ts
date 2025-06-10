import { OrderEntity } from '../domain/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

export class GetOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<OrderEntity> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }
}
