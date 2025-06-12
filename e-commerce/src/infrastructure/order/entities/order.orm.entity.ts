import { CustomerOrmEntity } from '@infrastructure/customer/entities/customer.orm.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm.entity';
import { OrderStatus } from '@application/order/domain/entities/order.props';
import { BaseEntity } from '@core/infrastructure/database';

@Entity('orders')
export class OrderOrmEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' }) // ID của khách hàng đặt hàng
    customerId: string;

    @ManyToOne(() => CustomerOrmEntity, (customer) => customer.orders, { nullable: true })
    @JoinColumn({ name: 'customerId' })
    customer: CustomerOrmEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ default: OrderStatus.PENDING })
    status: string;

    @OneToMany(() => OrderItemOrmEntity, (orderItem) => orderItem.order, {
        cascade: true,
        eager: true,
    })
    items: OrderItemOrmEntity[];
}
