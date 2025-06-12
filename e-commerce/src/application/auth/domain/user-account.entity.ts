import { AggregateRoot } from '@core/domain/aggregate-root';
import { UniqueEntityID } from '@core/domain/unique-entity-id';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { Result } from '@shared/logic/result';
import { UserAccountProps } from '@application/auth/domain/user-account.props';

export class UserAccountEntity extends AggregateRoot<UserAccountProps> {
    private constructor(props: UserAccountProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UniqueEntityID {
        return this.props.userId;
    }

    get fullName(): string {
        return this.props.fullName;
    }

    get customerId(): string {
        return this.props.customerId;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    public static async create(
        props: UserAccountProps,
        id?: UniqueEntityID,
    ): Promise<Result<UserAccountEntity>> {
        // TODO: Dispatch domain events
        return Result.ok<UserAccountEntity>(new UserAccountEntity(props, id));
    }

    public async validatePassword(plainTextPassword: string): Promise<boolean> {
        return this.password.comparePassword(plainTextPassword);
    }
}
