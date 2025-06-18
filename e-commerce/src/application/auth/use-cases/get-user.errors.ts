import { UseCaseException } from '@core/exceptions/use-case-exceptions';
import { Result } from '@shared/logic/result';

export namespace GetUserErrors {
    export class UserNotFound extends Result<UseCaseException> {
        constructor() {
            super(false, {
                message: `User not found`,
            } as UseCaseException);
        }
    }
}
