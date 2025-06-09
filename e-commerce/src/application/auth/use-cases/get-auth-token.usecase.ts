import { Inject, Injectable } from '@nestjs/common';
import { IUsecaseQuery } from '@shared/interfaces/application.interface';
import { LoginDto } from '../dtos/login.dto';
import { LogExecution } from '@shared/decorators';
import { Result } from '@shared/logic/result';
import { IUserRepository } from '../repositories/user.repository';
import { AccessTokenEntity } from '@application/auth/domain/access-token.entity';
import { GetAuthTokenErrors } from '@application/auth/use-cases/get-auth-token.errors';
import { AuthFactory } from '@application/auth/factories/auth.factory';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@LogExecution()
export class GetAuthTokenUsecase implements IUsecaseQuery<LoginDto, Result<AccessTokenEntity>> {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    private readonly authTokenFactory = new AuthFactory();

    public async query(login: LoginDto): Promise<Result<AccessTokenEntity>> {
        const authInstance = this.authTokenFactory.instance();
        authInstance.setUserRepository(this.userRepository);
        authInstance.setJwtService(this.jwtService);
        const user = await authInstance.login(login);

        const found = !!user;
        if (found) {
            return Result.ok<AccessTokenEntity>(user);
        }

        throw new GetAuthTokenErrors.UserPassInvalid();
    }
}
