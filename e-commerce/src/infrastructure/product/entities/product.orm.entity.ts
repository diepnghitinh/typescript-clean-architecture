import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '@core/infrastructure/database';

@Entity('products')
export class ProductOrmEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') // ID duy nhất cho sản phẩm
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 }) // Giá sản phẩm, ví dụ: 999.99
    price: number;

    @Column({ type: 'int' }) // Số lượng tồn kho
    stock: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    // --- Logic nghiệp vụ (Behavior) ---
    // Trong DDD, Entity không chỉ là dữ liệu mà còn có hành vi
    updateStock(quantity: number): void {
        if (this.stock - quantity < 0) {
            throw new Error('Not enough stock available.');
        }
        this.stock -= quantity;
    }

    activate(): void {
        this.isActive = true;
    }

    deactivate(): void {
        this.isActive = false;
    }
}
