import { Inject, Injectable } from '@nestjs/common';
import { IUsecaseQuery } from '@core/interfaces/application.interface';
import { LogExecution } from '@core/decorators';
import { Result } from '@shared/logic/result';
import { IUserRepository } from '../repositories/user.repository';
import { UserAccountEntity } from '../domain/user-account.entity';
import { GetUserErrors } from '@application/auth/use-cases/get-user.errors';

@Injectable()
@LogExecution()
export class GetUserUsecase implements IUsecaseQuery<string, Result<UserAccountEntity>> {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    public async query(userId: string): Promise<Result<UserAccountEntity>> {
        const user = await this.userRepository.findById(userId);
        const found = !!user;
        if (found) {
            return Result.ok<UserAccountEntity>(user);
        }

        throw new GetUserErrors.UserNotFound();
    }
}
