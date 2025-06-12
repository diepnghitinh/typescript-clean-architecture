import { IProductRepository } from '@application/product/repositories/product.repository';
import { OrderEntity } from '@application/order/domain/entities/order.entity';
import { IOrderRepository } from '@application/order/repositories/order.repository';

export class OrderFactory {
    protected orderRepository: IOrderRepository;
    protected productRepository: IProductRepository;

    constructor(orderRepo: IOrderRepository, productRepo: IProductRepository) {
        this.productRepository = productRepo;
        this.orderRepository = orderRepo;
    }

    async create(order: OrderEntity) {
        const orderItems = order.items.map((item) => {
            return {
                productId: item.productId.toString(),
                quality: item.quantity,
            };
        });
        // reduce product inventory
        // await this.productRepository.decrementStock(orderItems);
        // create order
        await this.orderRepository.save(order);
    }
}
