import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IPublishEndpoint } from 'nestjs-bustransit';
import { OrderSubmitted } from '@shared/events/order.saga';

@Injectable()
export class OrderSubmittedHandler {
    constructor(
        @Inject(IPublishEndpoint)
        private readonly publishEndpoint: IPublishEndpoint,
    ) {}

    @OnEvent(OrderSubmitted.constructor.name)
    public async handler(payload: any) {
        console.log(payload);
    }
}
