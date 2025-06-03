import { Module, Provider } from '@nestjs/common';
import { AuthController } from './auth.controller';

const providers: Provider[] = [];

@Module({
    imports: [],
    providers,
    controllers: [
        AuthController
    ],
})
export class IdentityAuthPresentationModule {}
