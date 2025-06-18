import { AggregateRoot } from "@core/domain";
import { Type } from "@nestjs/common";
import { IEvent } from "@core/interfaces";

export class MissingEventMetadataException extends Error {
	constructor(event: { name: string }) {
		super(`Missing event metadata exception for ${event.name} (missing @Event() decorator?)`);
	}
}

export class MissingEventHandlerException extends Error {
	constructor(aggregate: Type<AggregateRoot<any>>, event: Type<IEvent>) {
		super(
			`Missing event-handler exception for ${event.name} in ${aggregate.name} (missing @EventHandler(${event.name}) decorator?)`,
		);
	}
}

export class InvalidAggregateStreamNameException extends Error {
	public static becauseExceedsMaxLength(target: string, maxLength: number): InvalidAggregateStreamNameException {
		return new InvalidAggregateStreamNameException(
			`Stream name for aggregate '${target}' exceeds the maximum length of ${maxLength} characters.`,
		);
	}
}

export class InvalidEventStreamNameException extends Error {
	public static becauseExceedsMaxLength(target: string, maxLength: number): InvalidEventStreamNameException {
		return new InvalidEventStreamNameException(
			`Stream name for event '${target}' exceeds the maximum length of ${maxLength} characters.`,
		);
	}
}