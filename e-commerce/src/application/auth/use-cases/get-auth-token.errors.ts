import { UseCaseException } from '@shared/exceptions/use-case-exceptions';
import { Result } from '@shared/logic/result';

export namespace GetAuthTokenErrors {
    export class UserPassInvalid extends Result<UseCaseException> {
        constructor() {
            super(false, {
                message: `Incorrect account or password`,
            } as UseCaseException);
        }
    }
}
