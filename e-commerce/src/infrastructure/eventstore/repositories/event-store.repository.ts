import { DataSource, Repository } from 'typeorm';
import { EventStoreOrmEntity } from '../entities/event-store.orm.entity';
import { Injectable } from '@nestjs/common';
import { IEventStoreRepository } from './event-store.responsity.interface';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';

@Injectable()
export class EventStoreRepository extends BaseRepository<any, EventStoreOrmEntity>
implements IEventStoreRepository {
  constructor(dataSource: DataSource) {
    super(EventStoreOrmEntity, dataSource);
  }

  // Save a new event
  async saveEvent(event: Partial<EventStoreOrmEntity>): Promise<EventStoreOrmEntity> {
    return this.repository.save(event);
  }

  // Get events for an aggregate
  async getEventsByAggregateId(aggregate_id: string): Promise<EventStoreOrmEntity[]> {
    return this.repository.find({ where: { aggregate_id }, order: { version: 'ASC' } });
  }

  // Bulk save events
  async saveEvents(events: Partial<EventStoreOrmEntity>[]): Promise<EventStoreOrmEntity[]> {
    return this.repository.save(events);
  }

  toDomain(ormEntity: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  toOrmEntity(domainEntity: any) {
    throw new Error('Method not implemented.');
  }
} 