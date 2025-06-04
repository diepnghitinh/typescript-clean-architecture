import { ValueObject } from "@core/domain/value-object";
import { Guard } from "@shared/logic/guard";
import { Result } from "@shared/logic/result";
import * as bcrypt from 'bcrypt';

interface UserPasswordProps {
    value: string;
    hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    get value(): string {
        return this.props.value;
    }

    get isHashed(): boolean {
        return this.props.hashed || false;
    }

    private constructor(props: UserPasswordProps) {
        super(props);
    }

    public static async create(password: string, hashed: boolean = false): Promise<Result<UserPassword>> {
        const guardResult = Guard.againstNullOrUndefined(password, 'password');
        if (!guardResult.succeeded) {
            return Result.fail<UserPassword>(guardResult.message);
        }

        if (!hashed) {
            if (password.length < 8) {
                return Result.fail<UserPassword>('Password must be at least 8 characters long');
            }
        }

        return Result.ok<UserPassword>(new UserPassword({ value: password, hashed }));
    }

    public async getHashedValue(): Promise<string> {
        if (this.isHashed) {
            return this.value;
        }
        return bcrypt.hash(this.value, 10);
    }

    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        let hashed: string;
        if (this.isHashed) {
            hashed = this.value;
        } else {
            hashed = await this.getHashedValue();
        }
        return bcrypt.compare(plainTextPassword, hashed);
    }
} 