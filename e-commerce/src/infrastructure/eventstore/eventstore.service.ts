import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventStoreRepository } from './repositories/event-store.repository';
import { EventStoreOrmEntity } from './entities/event-store.orm.entity';
import { IEventStoreRepository } from './repositories/event-store.responsity.interface';

@Injectable()
export class EventStoreService {
  constructor(
    private readonly eventStoreRepository: IEventStoreRepository,
  ) {}

  public async saveEvent(event: Partial<EventStoreOrmEntity>): Promise<EventStoreOrmEntity> {
    return this.eventStoreRepository.saveEvent(event);
  }

  public async getEventsByAggregateId(aggregate_id: string): Promise<EventStoreOrmEntity[]> {
    return this.eventStoreRepository.getEventsByAggregateId(aggregate_id);
  }
} 