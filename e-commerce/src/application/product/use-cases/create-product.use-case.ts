import { ProductEntity } from '../domain/entities/product.entity';
import { IProductRepository } from '../repositories/product.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { Result } from '@shared/logic/result';

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(data: CreateProductDTO): Promise<Result<ProductEntity>> {
        const existingProduct = await this.productRepository.findByName(data.name);

        if (existingProduct) {
            throw new Error('Product with this name already exists');
        }

        // const product = await ProductEntity.create({
        //     ...data
        // });
        //
        // await this.productRepository.save(product.getValue());
        // return product;
        return null;
    }
}
