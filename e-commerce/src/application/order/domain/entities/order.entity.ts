import { Entity } from '@core/domain/entity';
import { OrderProps, OrderStatus, OrderItem } from './order.props';
import { UniqueEntityID } from '@core/domain';
import { Result } from '@shared/logic/result';

export class OrderEntity extends Entity<OrderProps> {
    private constructor(props: OrderProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    public static create(props: OrderProps, id?: UniqueEntityID): Result<OrderEntity> {
        return Result.ok<OrderEntity>(new OrderEntity(props, id));
    }

    get customerId(): string {
        return this.props.customerId;
    }

    get items(): OrderItem[] {
        return this.props.items;
    }

    get status(): OrderStatus {
        return this.props.status;
    }

    get totalAmount(): number {
        return this.props.totalAmount;
    }

    get shippingAddress(): string {
        return this.props.shippingAddress;
    }

    get paymentMethod(): string {
        return this.props.paymentMethod;
    }

    public addItem(item: OrderItem): void {
        if (item.quantity <= 0) {
            throw new Error('Item quantity must be greater than zero');
        }
        if (item.price < 0) {
            throw new Error('Item price cannot be negative');
        }

        const existingItemIndex = this.props.items.findIndex((i) => i.productId === item.productId);

        if (existingItemIndex >= 0) {
            this.props.items[existingItemIndex].quantity += item.quantity;
        } else {
            this.props.items.push(item);
        }

        this.updateTotalAmount();
    }

    public removeItem(productId: string): void {
        const itemIndex = this.props.items.findIndex((item) => item.productId === productId);

        if (itemIndex >= 0) {
            this.props.items.splice(itemIndex, 1);
            this.updateTotalAmount();
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
        this.updateTotalAmount();
    }

    public updateStatus(status: OrderStatus): void {
        this.props.status = status;
    }

    public updateShippingAddress(address: string): void {
        if (!address.trim()) {
            throw new Error('Shipping address cannot be empty');
        }
        this.props.shippingAddress = address;
    }

    public updatePaymentMethod(method: string): void {
        if (!method.trim()) {
            throw new Error('Payment method cannot be empty');
        }
        this.props.paymentMethod = method;
    }

    private updateTotalAmount(): void {
        this.props.totalAmount = this.props.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    }
}
