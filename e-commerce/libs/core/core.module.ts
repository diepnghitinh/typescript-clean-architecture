import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@module-shared/constants/auth';
import { ConfigModule } from '@nestjs/config';
import { getEnvFilePath } from '@shared/utils';
import { env } from 'process';
import * as joi from 'joi';
import { JsonWebTokenStrategy } from '@application/auth/services/jwt.strategy';

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.SECRET,
            signOptions: {
                expiresIn: jwtConstants.ACCESS_TOKEN_LIFETIME,
            },
        }),

        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: getEnvFilePath(env.NODE_ENV),
            expandVariables: true,
            validationSchema: joi.object({
                PORT: joi.number().required(),
            }),
        }),
    ],
    providers: [JsonWebTokenStrategy],
    exports: [JwtModule],
})
export class CoreModule {}
