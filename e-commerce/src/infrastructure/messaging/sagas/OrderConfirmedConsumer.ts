import {Controller, Inject, Injectable, Logger} from "@nestjs/common";
import { v7 as uuidv7 } from 'uuid';
import {BusTransitConsumer, IPublishEndpoint, ISagaConsumeContext} from "nestjs-bustransit";
import { OrderConfirmed } from "@shared/events/order.saga";


@Injectable()
export class OrderConfirmedConsumer extends BusTransitConsumer<OrderConfirmed> {

    constructor(
        @Inject(IPublishEndpoint)
        private readonly publishEndpoint: IPublishEndpoint,
    ) {
        super(OrderConfirmed);
    }

    async Consume(ctx, context: ISagaConsumeContext<any, OrderConfirmed>): Promise<any> {
        await super.Consume(ctx, context)
        return 'Order confirmed: ' + context.Message.OrderId
    }
}