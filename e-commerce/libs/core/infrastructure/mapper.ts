import { Entity } from '@core/domain';

export interface Mapper<DomainEntity extends Entity<any>, DbRecord, Response = any> {
    toPersistence(entity: DomainEntity): DbRecord;
    toDomain(record: any): DomainEntity;
    toResponse(entity: DomainEntity): Response;
}
