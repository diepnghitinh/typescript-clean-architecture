import { AggregateRoot } from "@core/domain";
import { Type } from "@nestjs/common";
import { IEvent } from "@core/interfaces";
import { EventHandlerMetadata } from "./event.interface";
import { getEventMetadata } from "@core/helpers/metadata";
import { EVENT_HANDLER_METADATA } from "@core/decorators/constants";

export interface EventMetadata {
	id: string;
	name: string;
}

export const getEventHandlerMetadata = (aggregate: AggregateRoot<any>, eventClass: Type<IEvent>): EventHandlerMetadata => {
	const { name } = getEventMetadata(eventClass);
	return Reflect.getMetadata(`${EVENT_HANDLER_METADATA}-${name}`, aggregate) || {};
};