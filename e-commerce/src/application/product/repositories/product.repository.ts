import { ProductEntity } from '../domain/entities/product.entity';

export interface ProductRepository {
    findById(id: string): Promise<ProductEntity | null>;
    findByName(name: string): Promise<ProductEntity | null>;
    findAll(): Promise<ProductEntity[]>;
    findByCategory(category: string): Promise<ProductEntity[]>;
    save(product: ProductEntity): Promise<void>;
    update(product: ProductEntity): Promise<void>;
    delete(id: string): Promise<void>;
}
