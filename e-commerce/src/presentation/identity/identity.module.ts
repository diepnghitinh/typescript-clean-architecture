import { LibRouterModule } from '@core/router/router.module';
import { Module } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { IdentityAuthPresentationModule } from './auth/auth.module';

export const routersConfig = {
    routers: [
        {
            path: '/identity',
            children: [
                {
                    path: 'auth',
                    module: IdentityAuthPresentationModule,
                },
            ],
        },
    ],
    swaggerPath: 'identity',
    swagger: () => {
        return new DocumentBuilder()
            .setTitle('Identity API')
            .setDescription('The API description')
            .setVersion('1.0')
            .addTag('Auth', '')
            .addBearerAuth(
                { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                'JWT-auth',
            )
            .addServer(`/`)
            .build();
    },
};

@Module({
    imports: [LibRouterModule.register(routersConfig.routers)],
})
export class IdentityPresentationModule {}
