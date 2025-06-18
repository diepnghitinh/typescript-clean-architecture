import { IEvent } from "@core/interfaces";
import { Event } from '@core/decorators/event.decorator'
 
@Event('order-tested')
export class OrderTestedEvent implements IEvent {
  constructor(
    public readonly accountId: string,
  ) {}
}

