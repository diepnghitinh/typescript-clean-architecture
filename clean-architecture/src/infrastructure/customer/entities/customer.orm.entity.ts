import { OrderOrmEntity } from '@infrastructure/order/entities/order.orm.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('customers')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Mối quan hệ OneToMany với Order (nếu cần truy cập các đơn hàng của khách hàng từ Customer)
  // Lưu ý: Đây là mối quan hệ giữa các Aggregate Root. Trong DDD, bạn thường chỉ lưu ID
  // và tìm nạp Order thông qua Repository của Order nếu cần.
  @OneToMany(() => OrderOrmEntity, (order) => order.customer)
  orders: OrderOrmEntity[];

  // --- Logic nghiệp vụ (Behavior) ---
  updateProfile(firstName: string, lastName: string, phoneNumber?: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }
}