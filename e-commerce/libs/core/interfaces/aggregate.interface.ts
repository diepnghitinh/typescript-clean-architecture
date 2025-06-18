import { IEvent } from "@core/interfaces";

export type IEventHandlerMethod<E extends IEvent> = (event: E) => void;

/**
 * `@Aggregate` decorator metadata
 */
export interface AggregateMetadata {
	/**
	 * The name of the streams for this aggregate.
	 */
	streamName?: string;
	/**
	 * Event publishers
	 */
	// publishers?: IEventPublisher[];
}