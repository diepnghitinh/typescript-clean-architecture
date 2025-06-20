import { EventStoreOrmEntity } from "../entities/event-store.orm.entity";

export abstract class IEventStoreRepository {
    saveEvent: (event: Partial<EventStoreOrmEntity>) => Promise<EventStoreOrmEntity>;
    getEventsByAggregateId: (aggregate_id: string) => Promise<EventStoreOrmEntity[]>;
    abstract saveEvents: (events: Partial<EventStoreOrmEntity>[]) => Promise<EventStoreOrmEntity[]>;
}
