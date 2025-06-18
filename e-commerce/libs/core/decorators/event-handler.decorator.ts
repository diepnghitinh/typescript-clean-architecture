import 'reflect-metadata';
import type { Type } from '@nestjs/common';
import { EVENT_HANDLER_METADATA } from './constants';
import { getEventMetadata } from '@core/helpers/metadata';
import { MissingEventMetadataException } from '@core/exceptions/application.exception';
import { IEvent } from '@core/interfaces';

/**
 * Decorator that marks an aggregate method as an event handler. An event-handler handles an event that needs to be applied to the aggregate.
 * @param {IEvent} event An event constructors for which the instances will be passed to the subscriber.
 * @returns {PropertyDecorator}
 * @example `@EventHandler(AccountOpenedEvent)`
 */
export const EventHandler = (event: Type<IEvent>): PropertyDecorator => {
	const { name } = getEventMetadata(event);

	if (!name) {
		throw new MissingEventMetadataException(event);
	}

	return (propertyParent, propertyKey) => {
		Reflect.defineMetadata(`${EVENT_HANDLER_METADATA}-${name}`, { method: propertyKey }, propertyParent);
	};
};