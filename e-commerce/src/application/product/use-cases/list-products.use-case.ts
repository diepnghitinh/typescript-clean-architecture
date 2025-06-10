import { ProductEntity } from '../domain/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

export class ListProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(category?: string): Promise<ProductEntity[]> {
        if (category) {
            return this.productRepository.findByCategory(category);
        }
        return this.productRepository.findAll();
    }
}
