import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@core/infrastructure/database';
import { OrderOrmEntity } from './order.orm.entity';
import { ProductOrmEntity } from '@infrastructure/product/entities/product.orm.entity';

@Entity('order_items')
export class OrderItemOrmEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' }) // The ID of the order this item belongs to
    orderId: string;

    @Column({ type: 'uuid' }) // ID of product
    productId: string;

    @Column({ type: 'int' }) // amount of products
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 }) // Price at time of order
    price: number;

    @ManyToOne(() => OrderOrmEntity, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: OrderOrmEntity;

    @ManyToOne(() => ProductOrmEntity, (product) => product.id, { nullable: true })
    @JoinColumn({ name: 'productId' })
    product: ProductOrmEntity;
}
