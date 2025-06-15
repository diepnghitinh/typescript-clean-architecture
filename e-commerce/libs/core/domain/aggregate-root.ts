import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';
import { Type } from '@nestjs/common';

export abstract class AggregateRoot<T> extends Entity<T>  {

    get id(): UniqueEntityID {
        return this._id;
    }
}
