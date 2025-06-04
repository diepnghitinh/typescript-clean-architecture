import { AggregateID, AggregateRoot } from "@core/domain/entity.base";

export interface UserAccountProps  {
    userId: AggregateID;
}

export class UserAccountEntity extends AggregateRoot<UserAccountProps> {
}