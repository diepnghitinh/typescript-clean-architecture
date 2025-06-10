import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IProductRepository } from '@application/product/repositories/product.repository';
import { ProductEntity } from '@application/product/domain/entities/product.entity';
import { UniqueEntityID } from '@core/domain';
import { ProductOrmEntity } from '../entities/product.orm.entity';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';

@Injectable()
export class ProductRepository
    extends BaseRepository<ProductEntity, ProductOrmEntity>
    implements IProductRepository
{
    constructor(dataSource: DataSource) {
        super(ProductOrmEntity, dataSource);
    }

    async findById(id: string): Promise<ProductEntity | null> {
        const product = await this.repository.findOne({
            where: { id },
        });

        if (!product) return null;

        return this.toDomain(product);
    }

    async findByName(name: string): Promise<ProductEntity | null> {
        const product = await this.repository.findOne({
            where: { name },
        });

        if (!product) return null;

        return this.toDomain(product);
    }

    async findAll(): Promise<ProductEntity[]> {
        return [];
    }

    async save(product: ProductEntity): Promise<void> {
        const productData = this.repository.create({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            isActive: product.isActive,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await this.repository.save(productData);
    }

    async update(product: ProductEntity): Promise<void> {
        await this.repository.update(
            { id: product.id.toString() },
            {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                isActive: product.isActive,
                updatedAt: new Date(),
            },
        );
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

    async toDomain(ormEntity: ProductOrmEntity): Promise<ProductEntity> {
        const productOrError = await ProductEntity.create(
            {
                name: ormEntity.name,
                description: ormEntity.description,
                price: ormEntity.price,
                stock: ormEntity.stock,
                isActive: ormEntity.isActive,
                createdAt: ormEntity.createdAt,
                updatedAt: ormEntity.updatedAt,
            },
            new UniqueEntityID(ormEntity.id),
        );

        if (productOrError.isFailure) {
            throw new Error('Failed to create user entity');
        }

        return productOrError.getValue();
    }

    toOrmEntity(domainEntity: ProductEntity): void {}
}
