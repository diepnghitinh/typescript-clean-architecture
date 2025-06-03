import { CustomerOrmEntity } from '@infrastructure/customer/entities/customer.orm.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm.entity';

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' }) // ID của khách hàng đặt hàng
  customerId: string;

  // Mối quan hệ với Customer (nếu cần truy cập trực tiếp từ Order)
  // Trong DDD, thường không nên có mối quan hệ trực tiếp giữa các Aggregate Root
  // nếu không thực sự cần thiết để duy trì tính nhất quán của Aggregate.
  // Tuy nhiên, trong TypeORM, bạn có thể định nghĩa để thuận tiện cho việc truy vấn.
  @ManyToOne(() => CustomerOrmEntity, (customer) => customer.orders, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer: CustomerOrmEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: OrderStatus.PENDING })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Mối quan hệ OneToMany với OrderItem (các OrderItem là một phần của Aggregate Order)
  @OneToMany(() => OrderItemOrmEntity, (orderItem) => orderItem.order, { cascade: true, eager: true })
  items: OrderItemOrmEntity[];

  // --- Logic nghiệp vụ (Behavior) ---
  confirmOrder(): void {
    if (this.status === OrderStatus.PENDING) {
      this.status = OrderStatus.CONFIRMED;
    } else {
      throw new Error('Order cannot be confirmed from its current status.');
    }
  }

  cancelOrder(): void {
    if (this.status === OrderStatus.PENDING || this.status === OrderStatus.CONFIRMED) {
      this.status = OrderStatus.CANCELLED;
      // Logic hoàn trả hoặc cập nhật tồn kho có thể được kích hoạt ở đây
    } else {
      throw new Error('Order cannot be cancelled from its current status.');
    }
  }

  // Phương thức để thêm OrderItem (duy trì tính nhất quán của Aggregate)
  addOrderItem(item: OrderItemOrmEntity): void {
    if (!this.items) {
      this.items = [];
    }
    this.items.push(item);
    this.calculateTotalAmount(); // Cập nhật tổng số tiền khi thêm item
  }

  private calculateTotalAmount(): void {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}