import { IsNotEmpty } from '@nestjs/class-validator';

export class OrderSubmitted {
    public OrderId: string;
    public Total: number;
    public Email: string;

    constructor({ OrderId, Total, Email }) {
        this.OrderId = OrderId;
        this.Total = Total;
        this.Email = Email;
    }
}

export class ProcessPayment {
    @IsNotEmpty()
    OrderId: string;

    @IsNotEmpty()
    Amount: number;
}

export class RefundPayment {
    OrderId: string;
    Amount: number;
}

export class OrderConfirmed {
    OrderId: string;
}

export class ReserveInventory {
    OrderId: string;
}

export class OrderFailed {
    OrderId: string;
    Reason: string;
}