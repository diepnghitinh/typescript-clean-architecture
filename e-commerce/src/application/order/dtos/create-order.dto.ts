import { OrderItem } from '../domain/entities/order.props';

export interface CreateOrderDTO {
    customerId: string;
    items: OrderItem[];
    shippingAddress: string;
    paymentMethod: string;
}
