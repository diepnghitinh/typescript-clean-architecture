import type { Type } from '@nestjs/common';
import { IEvent } from '@core/interfaces';
import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';
import { IEventHandlerMethod } from '@core/interfaces/aggregate.interface';
import { getEventHandlerMetadata } from '@core/helpers/metadata';
import { MissingEventHandlerException } from '@core/exceptions/application.exception';

const VERSION = Symbol();
const EVENTS = Symbol();

export abstract class AggregateRoot<T> extends Entity<T> {

    private [VERSION] = 0;
	private readonly [EVENTS]: IEvent[] = [];

    get id(): UniqueEntityID {
        return this._id;
    }

    applyEvent<T extends IEvent = IEvent>(event: T, fromHistory = false) {
		this[VERSION]++;

		// If we're just hydrating the aggregate with events,
		// don't push the event to the internal event collection to be committed
		if (!fromHistory) {
			this[EVENTS].push(event);
		}

		const handler = this.getEventHandler(event.constructor as Type<T>);
		handler?.call(this, event);
	}

	private getEventHandler<T extends IEvent = IEvent>(eventClass: Type<T>): IEventHandlerMethod<IEvent> | undefined {
		const { method } = getEventHandlerMetadata(this, eventClass);

		if (!method) {
			throw new MissingEventHandlerException(this.constructor as Type<AggregateRoot<T>>, eventClass);
		}

		return this[method];
	}

	commit(): IEvent[] {
		const events = [...this[EVENTS]];
		this[EVENTS].length = 0;

		return events;
	}
}
