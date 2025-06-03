import { LibRouterModule } from '@core/router/router.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector, Routes } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AdminProductPresentationModule } from './product/product.module';

export const routersConfig = {
    routers: [
        {
            path: '/admin',
            children: [
                {
                    path: 'products',
                    module: AdminProductPresentationModule,
                },
            ],
        },
    ],
    swaggerPath: 'admin',
    swagger: () => {
        return new DocumentBuilder()
        .setTitle('Admin API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('Orders', '')
        .addBearerAuth(
            { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'JWT-auth',
        )
        .addApiKey({ type: 'apiKey', name: 'X-Api-Key', in: 'header' }, 'X-Api-Key')
        .addServer(`/`)
        .build();
    }
}

@Module({
    imports: [LibRouterModule.register(routersConfig.routers)],
})
export class AdminPresentationModule {}
