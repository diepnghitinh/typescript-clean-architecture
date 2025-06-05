import {
    BaseEntity as TypeOrmBaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
}
