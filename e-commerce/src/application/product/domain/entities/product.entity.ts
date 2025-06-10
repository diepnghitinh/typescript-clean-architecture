import { Entity } from '@core/domain/entity';
import { ProductProps } from './product.props';
import { UniqueEntityID } from '@core/domain';

export class ProductEntity extends Entity<ProductProps> {
    private constructor(props: ProductProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    public static create(props: ProductProps, id?: UniqueEntityID): ProductEntity {
        return new ProductEntity(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    get stock(): number {
        return this.props.stock;
    }

    get category(): string {
        return this.props.category;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    public updateStock(quantity: number): void {
        if (quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        this.props.stock = quantity;
    }

    public updatePrice(price: number): void {
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        this.props.price = price;
    }

    public activate(): void {
        this.props.isActive = true;
    }

    public deactivate(): void {
        this.props.isActive = false;
    }
}
