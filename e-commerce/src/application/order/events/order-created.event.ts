import { IEvent } from "@core/interfaces";
import { Event } from '@core/decorators/event.decorator'

@Event('order-created')
export class OrderCreatedEvent implements IEvent {
    public OrderId: string;
    public Total: number;

    constructor({ OrderId, Total }) {
        this.OrderId = OrderId;
        this.Total = Total;
    }
}