import { ProductEntity } from '../domain/entities/product.entity';

export abstract class IProductRepository {
    findById: (id: string) => Promise<ProductEntity | null>;
    findByIds: (ids: string[]) => Promise<ProductEntity[] | null>;
    findByName: (name: string) => Promise<ProductEntity | null>;
    findAll: () => Promise<ProductEntity[]>;
    save: (product: ProductEntity) => Promise<void>;
    decrementStock: (stockUpdates: { productId: string; quality: number }[]) => Promise<void>;
    update: (product: ProductEntity) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
