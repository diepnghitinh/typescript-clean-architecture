import { ProductEntity } from '../domain/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(data: CreateProductDTO): Promise<ProductEntity> {
        const existingProduct = await this.productRepository.findByName(data.name);

        if (existingProduct) {
            throw new Error('Product with this name already exists');
        }

        const product = ProductEntity.create({
            ...data,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await this.productRepository.save(product);
        return product;
    }
}
