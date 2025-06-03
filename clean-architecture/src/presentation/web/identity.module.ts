import { LibRouterModule } from '@core/router/router.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector, Routes } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';

export const routersConfig = {
    path: 'identity',
    routers: [
        {
            path: '/',
            children: [
                {
                    path: 'users',
                    module: UserPresentationModule,
                },
            ],
        },
    ],
    swagger: () => {
        return new DocumentBuilder()
        .setTitle('Identity API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('Users', '')
        .addBearerAuth(
            { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'Authorization',
        )
        .addApiKey({ type: 'apiKey', name: 'X-Api-Key', in: 'header' }, 'X-Api-Key')
        .addServer(`/`)
        .build();
    }
}

@Module({
    imports: [LibRouterModule.register(routersConfig.routers)],
})
export class IdentityPresentationModule {}
