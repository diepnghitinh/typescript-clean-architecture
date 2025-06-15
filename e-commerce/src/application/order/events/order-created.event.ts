import { Event, type IEvent } from '@ocoda/event-sourcing';

@Event('order-created')
export class OrderCreatedEvent implements IEvent {
    constructor(public readonly orderId: string) {}
}
