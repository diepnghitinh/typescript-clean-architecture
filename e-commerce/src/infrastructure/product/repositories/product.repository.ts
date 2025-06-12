import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IProductRepository } from '@application/product/repositories/product.repository';
import { ProductEntity } from '@application/product/domain/entities/product.entity';
import { UniqueEntityID } from '@core/domain';
import { ProductOrmEntity } from '../entities/product.orm.entity';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';

@Injectable()
export class ProductRepository
    extends BaseRepository<ProductEntity | ProductEntity[], ProductOrmEntity>
    implements IProductRepository
{
    constructor(dataSource: DataSource) {
        super(ProductOrmEntity, dataSource);
    }

    async findById(id: string): Promise<ProductEntity | any> {
        const product = await this.repository.findOne({
            where: { id },
        });

        if (!product) return null;

        return this.toDomain(product);
    }

    async findByIds(productIds: string[]): Promise<ProductEntity[] | any> {
        const products = await this.repository
            .createQueryBuilder('product')
            .select('product.id')
            .addSelect('product.price')
            .where('product.id in (:...productIds)', {
                productIds,
            })
            .getMany();

        if (!products) return null;

        return this.toDomain(products);
    }

    async findByName(name: string): Promise<ProductEntity | any> {
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

    async decrementStock(stockUpdates: { productId: string; quality: number }[]): Promise<void> {
        // Bulk update stock for multiple products
        // Use a single query to decrement stock for each product by its corresponding quantity
        // Note: TypeORM does not natively support VALUES in UPDATE for all drivers, so we use raw query

        if (stockUpdates.length === 0) return;

        // Build the CASE WHEN SQL for bulk update
        const cases = stockUpdates
            .map((u) => `WHEN id = '${u.productId}' THEN stock - ${u.quality}`)
            .join(' ');

        const ids = stockUpdates.map((u) => u.productId);

        // Compose the SQL
        const sql = `
            UPDATE products
            SET stock = CASE
                ${cases}
                ELSE stock
            END
            WHERE id IN (${ids.map((_value) => `'${_value}'`).join(', ')})
        `;

        await this.repository.query(sql);
    }

    async toDomain(
        ormEntity: ProductOrmEntity | ProductOrmEntity[],
    ): Promise<ProductEntity | ProductEntity[] | null> {
        const defineProduct = async (orm) => {
            return await ProductEntity.create(
                {
                    id: orm.id,
                    name: orm.name,
                    description: orm.description,
                    price: orm.price,
                    stock: orm.stock,
                    isActive: orm.isActive,
                    createdAt: orm.createdAt,
                    updatedAt: orm.updatedAt,
                },
                new UniqueEntityID(orm.id),
            );
        };

        if (ormEntity instanceof ProductOrmEntity) {
            const productOrError = await defineProduct(ormEntity);

            if (productOrError.isFailure) {
                throw new Error('Failed to create product entity');
            }

            return productOrError.getValue();
        }

        return Promise.all(
            ormEntity.map(async (orm) => {
                const productOrError = await defineProduct(orm);

                if (productOrError.isFailure) {
                    throw new Error('Failed to create product entity');
                }

                return productOrError.getValue();
            }),
        );
    }

    toOrmEntity(domainEntity: ProductEntity): void {}
}
