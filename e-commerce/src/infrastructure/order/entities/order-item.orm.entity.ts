import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderOrmEntity } from './order.orm.entity';
import { ProductOrmEntity } from '@infrastructure/product/entities/product.orm.entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' }) // ID của đơn hàng mà item này thuộc về
  orderId: string;

  @Column({ type: 'uuid' }) // ID của sản phẩm
  productId: string;

  @Column({ type: 'int' }) // Số lượng sản phẩm
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Giá tại thời điểm đặt hàng
  price: number;

  // Mối quan hệ ManyToOne với Order (mỗi OrderItem thuộc về một Order)
  @ManyToOne(() => OrderOrmEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: OrderOrmEntity;

  // Mối quan hệ ManyToOne với Product (mỗi OrderItem liên quan đến một Product)
  // Lưu ý: Đây là mối quan hệ giữa các Aggregate. Trong DDD, bạn thường chỉ lưu ID
  // và tìm nạp Product thông qua Repository của Product nếu cần,
  // nhưng TypeORM cho phép định nghĩa mối quan hệ này để thuận tiện.
  @ManyToOne(() => ProductOrmEntity, (product) => product.id, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: ProductOrmEntity; // Để có thể truy cập thông tin sản phẩm từ OrderItem
}