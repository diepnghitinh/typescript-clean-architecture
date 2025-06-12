import { OrderProps, OrderStatus } from './order.props';
import { AggregateRoot, UniqueEntityID } from '@core/domain';
import { Result } from '@shared/logic/result';
import { OrderItemEntity } from '@application/order/domain/entities/order-item.entity';
import { Guard } from '@shared/logic/guard';

export class OrderEntity extends AggregateRoot<OrderProps> {
    private constructor(props: OrderProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    public static async create(
        props: OrderProps,
        id?: UniqueEntityID,
    ): Promise<Result<OrderEntity>> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.customerId, argumentName: 'customerId' },
            { argument: props.totalPrice, argumentName: 'totalPrice' },
            { argument: props.shippingAddress, argumentName: 'shippingAddress' },
            { argument: props.paymentMethod, argumentName: 'paymentMethod' },
            { argument: props.items, argumentName: 'items' },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<OrderEntity>(guardResult.message);
        }

        const order = new OrderEntity(
            {
                ...props,
                items: props.items ? props.items : [],
            },
            id,
        );

        const idWasProvided = !!id;
        // Dispatch to Domain Event
        if (!idWasProvided) {
            // order.addDomainEvent(new OrderCreatedEvent());
            // await order.addSagaEvent<OrderSubmitted>(
            //     ,
            // );
        }

        return Result.ok<OrderEntity>(order);
    }

    get customerId(): string {
        return this.props.customerId;
    }

    get items(): OrderItemEntity[] {
        return this.props.items;
    }

    get status(): OrderStatus {
        return this.props.status;
    }

    get totalPrice(): number {
        return this.props.totalPrice;
    }

    get shippingAddress(): string {
        return this.props.shippingAddress;
    }

    get paymentMethod(): string {
        return this.props.paymentMethod;
    }

    public addItem(item: OrderItemEntity): void {
        if (item.quantity <= 0) {
            throw new Error('Item quantity must be greater than zero');
        }

        const existingItemIndex = this.props.items.findIndex((i) => i.productId === item.productId);

        if (existingItemIndex >= 0) {
            this.props.items[existingItemIndex].quantity += item.quantity;
        } else {
            this.props.items.push(item);
        }
    }

    public removeItem(productId: string): void {
        const itemIndex = this.props.items.findIndex((item) => item.productId === productId);

        if (itemIndex >= 0) {
            this.props.items.splice(itemIndex, 1);
        }
    }

    public updateItemQuantity(productId: string, quantity: number): void {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }

        const item = this.props.items.find((i) => i.productId === productId);
        if (!item) {
            throw new Error('Item not found in order');
        }

        item.quantity = quantity;
    }

    public updateStatus(status: OrderStatus): void {
        this.props.status = status;
    }
}
