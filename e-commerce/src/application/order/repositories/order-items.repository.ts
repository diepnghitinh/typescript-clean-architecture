
export abstract class IOrderItemsRepository {
    findById: (id: string) => Promise<OrderItemEntity | null>;
    findByOrderId: (orderId: string) => Promise<OrderItemEntity[]>;
    save: (orderItem: OrderItemEntity) => Promise<void>;
    update:(orderItem: OrderItemEntity) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
