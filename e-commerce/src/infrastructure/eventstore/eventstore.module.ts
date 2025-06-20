import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreOrmEntity } from './entities/event-store.orm.entity';
import { EventStoreRepository } from './repositories/event-store.repository';
import { EventStoreService } from './eventstore.service';

@Global()
@Module({
    imports: [],
    providers: [EventStoreService],
    exports: [EventStoreService],
})
export class EventStoreInfrastructureModule {}