import { Module, Provider } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserAccountMapper } from '@application/auth/mappers/user-account.mapper';
import { GetAuthTokenUsecase } from '@application/auth/use-cases/get-auth-token.usecase';
import { GetUserUsecase } from '@application/auth/use-cases/get-user.usecase';
import { AccessTokenMapper } from '@application/auth/mappers/access-token.mapper';
import { LinkedInStrategy } from '@application/auth/services/linkedin.strategy';

const providers: Provider[] = [
    UserAccountMapper,
    AccessTokenMapper,

    GetAuthTokenUsecase,
    GetUserUsecase,
    LinkedInStrategy,
];

@Module({
    imports: [],
    providers,
    controllers: [AuthController],
})
export class IdentityAuthPresentationModule {}
