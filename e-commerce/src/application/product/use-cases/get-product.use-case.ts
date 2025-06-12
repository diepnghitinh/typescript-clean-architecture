import { ProductEntity } from '../domain/entities/product.entity';
import { ProductRepository } from '@infrastructure/product/repositories/product.repository';

export class GetProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<ProductEntity> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }
}
