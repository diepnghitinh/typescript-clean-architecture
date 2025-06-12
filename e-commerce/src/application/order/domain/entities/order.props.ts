import { OrderItemEntity } from '@application/order/domain/entities/order-item.entity';
import { UniqueEntityID } from '@core/domain';

export interface OrderProps {
    id: UniqueEntityID;
    customerId: string;
    items: OrderItemEntity[];
    status: OrderStatus;
    totalPrice: number;
    shippingAddress: string;
    paymentMethod: string;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    UNFULFILLED = 'UNFULFILLED',
    FULFILLED = 'FULFILLED',
    PAID = 'PAID',
    REFUND = 'REFUND',
    CANCELLED = 'CANCELLED',
}
