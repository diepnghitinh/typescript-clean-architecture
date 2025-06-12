import { Entity, UniqueEntityID } from '@core/domain';
import { OrderItemProps } from '@application/order/domain/entities/order-item.props';
import { Result } from '@shared/logic/result';

export class OrderItemEntity extends Entity<OrderItemProps> {
    private constructor(props: OrderItemProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get productId(): string {
        return this.props.productId;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    set quantity(value: number) {
        if (value <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this.props.quantity = value;
    }

    public static create(props: OrderItemProps, id?: UniqueEntityID): Result<OrderItemEntity> {
        return Result.ok<OrderItemEntity>(new OrderItemEntity(props, id));
    }
}
