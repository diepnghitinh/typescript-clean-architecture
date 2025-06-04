import { Module, Provider } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GetUserLoginUsecase } from '@application/auth/use-cases/get-user-login.usecase';

const providers: Provider[] = [
    GetUserLoginUsecase
];

@Module({
    imports: [],
    providers,
    controllers: [
        AuthController
    ],
})
export class IdentityAuthPresentationModule {}
