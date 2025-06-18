import { AggregateRoot } from '@core/domain/aggregate-root';
import { EventHandlerMetadata } from '@core/interfaces/event.interface';
import { EventMetadata } from '@core/interfaces/metadata.interface';
import type { Type } from '@nestjs/common';
import { EVENT_HANDLER_METADATA, EVENT_METADATA } from '@core/decorators/constants';
import { IEvent } from '@core/interfaces';

export const getEventMetadata = (event: Type<IEvent>): EventMetadata => {
	return Reflect.getMetadata(EVENT_METADATA, event) ?? {};
};

export const getEventHandlerMetadata = (aggregate: AggregateRoot<any>, eventClass: Type<IEvent>): EventHandlerMetadata => {
	const { name } = getEventMetadata(eventClass);
	return Reflect.getMetadata(`${EVENT_HANDLER_METADATA}-${name}`, aggregate) || {};
};