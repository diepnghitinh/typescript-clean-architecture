import { Module } from '@nestjs/common';
import { EventSourcingModule } from '@ocoda/event-sourcing';
import { OrderCreatedEvent } from './events/order-created.event';

@Module({
    imports: [
        EventSourcingModule.forRoot({
            events: [OrderCreatedEvent],
        }),
    ],
    providers: [],
})
export class ApplicationOrderModule {}
