import { ProductEntity } from '../domain/entities/product.entity';
import { IProductRepository } from '../repositories/product.repository';
import { UpdateProductDTO } from '../dtos/update-product.dto';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(id: string, data: UpdateProductDTO): Promise<ProductEntity> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        if (data.name) {
            const existingProduct = await this.productRepository.findByName(data.name);
            if (existingProduct && existingProduct.id.toString() !== id) {
                throw new Error('Product with this name already exists');
            }
        }

        if (data.price !== undefined) {
            product.updatePrice(data.price);
        }

        if (data.stock !== undefined) {
            product.updateStock(data.stock);
        }

        if (data.isActive !== undefined) {
            data.isActive ? product.activate() : product.deactivate();
        }

        await this.productRepository.update(product);
        return product;
    }
}
