import { OrderEntity } from '../domain/entities/order.entity';
import { IOrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../domain/entities/order.props';

export class ListOrdersUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(customerId?: string, status?: OrderStatus): Promise<OrderEntity[]> {
        if (customerId) {
            return this.orderRepository.findByCustomerId(customerId);
        }

        if (status) {
            return this.orderRepository.findByStatus(status);
        }

        return this.orderRepository.findAll();
    }
}
