import { ValueObject } from "@core/domain/value-object";
import { Guard } from "@shared/logic/guard";
import { Result } from "@shared/logic/result";

interface UserEmailProps {
    value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserEmailProps) {
        super(props);
    }

    public static create(email: string): Result<UserEmail> {
        const guardResult = Guard.againstNullOrUndefined(email, 'email');
        if (!guardResult.succeeded) {
            return Result.fail<UserEmail>(guardResult.message);
        } else {
            return Result.ok<UserEmail>(new UserEmail({ value: email }))
        }
    }
}