import { OrderEntity } from '../domain/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { UpdateOrderDTO } from '../dtos/update-order.dto';

export class UpdateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string, data: UpdateOrderDTO): Promise<OrderEntity> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new Error('Order not found');
        }

        if (data.status) {
            order.updateStatus(data.status);
        }

        if (data.shippingAddress) {
            order.updateShippingAddress(data.shippingAddress);
        }

        if (data.paymentMethod) {
            order.updatePaymentMethod(data.paymentMethod);
        }

        await this.orderRepository.update(order);
        return order;
    }
}
