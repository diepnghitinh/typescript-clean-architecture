
import { OrderCreatedEvent } from '@application/order/events/order-created.event';
import { OrderTestedEvent } from '@application/order/events/order-test.event';
import {Global, Logger, Module, Provider} from '@nestjs/common';

@Global()
@Module({
    imports: [
    ],
    providers: [
    ],
})
export class EventStoreInfrastructureModule {}