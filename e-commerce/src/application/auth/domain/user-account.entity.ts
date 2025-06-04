import { AggregateRoot } from "@core/domain/aggregate-root";
import { UniqueEntityID } from "@core/domain/unique-entity-id";
import { UserEmail } from "./user-email";
import { UserPassword } from "./user-password";
import { Result } from "@shared/logic/result";

export interface UserAccountProps {
    userId: UniqueEntityID;
    email: UserEmail;
    password: UserPassword;
}

export class UserAccountEntity extends AggregateRoot<UserAccountProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UniqueEntityID {
        return this.props.userId;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    private constructor(props: UserAccountProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static async create(
        props: UserAccountProps,
        id?: UniqueEntityID
    ): Promise<Result<UserAccountEntity>> {
        return Result.ok<UserAccountEntity>(new UserAccountEntity(props, id));
    }

    public async validatePassword(plainTextPassword: string): Promise<boolean> {
        return this.password.comparePassword(plainTextPassword);
    }
}