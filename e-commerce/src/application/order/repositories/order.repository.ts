import { OrderEntity } from '../domain/entities/order.entity';
import { OrderStatus } from '../domain/entities/order.props';

export abstract class IOrderRepository {
    findById: (id: string) => Promise<OrderEntity | null>;
    findByCustomerId: (customerId: string) => Promise<OrderEntity[]>;
    findByStatus: (status: OrderStatus) => Promise<OrderEntity[]>;
    findAll: () => Promise<OrderEntity[]>;
    save: (order: OrderEntity) => Promise<void>;
    update: (order: OrderEntity) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
