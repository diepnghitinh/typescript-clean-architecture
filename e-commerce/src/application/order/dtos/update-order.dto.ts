import { OrderStatus } from '../domain/entities/order.props';

export interface UpdateOrderDTO {
    status?: OrderStatus;
    shippingAddress?: string;
    paymentMethod?: string;
}
