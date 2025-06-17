import { OrderSubmitted } from "./order.saga";

export const SagaMapper = {
    'OrderCreatedEvent': OrderSubmitted,
}