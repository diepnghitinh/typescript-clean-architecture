import { AggregateRoot } from '@core/domain/aggregate-root';
import { UniqueEntityID } from '@core/domain/unique-entity-id';
import { Result } from '@shared/logic/result';

export interface AccessTokenProps {
    accessToken: string;
    refreshToken: string;
}

export class AccessTokenEntity extends AggregateRoot<AccessTokenProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get accessToken(): string {
        return this.props.accessToken;
    }

    get refreshToken(): string {
        return this.props.refreshToken;
    }

    private constructor(props: AccessTokenProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: AccessTokenProps, id?: UniqueEntityID): Result<AccessTokenEntity> {
        return Result.ok<AccessTokenEntity>(new AccessTokenEntity(props, id));
    }
}
