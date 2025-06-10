import { BaseEntity } from '@core/infrastructure/database/typeorm';
import { CustomerOrmEntity } from '@infrastructure/customer/entities/customer.orm.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToOne(() => CustomerOrmEntity)
    @JoinColumn()
    customer: CustomerOrmEntity;
}
