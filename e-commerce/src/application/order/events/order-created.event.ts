import { Event, type IEvent } from '@ocoda/event-sourcing';

@Event('order-created')
export class OrderCreatedEvent implements IEvent {
    public OrderId: string;
    public Total: number;

    constructor({ OrderId, Total }) {
        this.OrderId = OrderId;
        this.Total = Total;
    }
}
