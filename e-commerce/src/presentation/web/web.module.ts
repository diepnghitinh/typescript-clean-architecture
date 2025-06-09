import { LibRouterModule } from '@core/router/router.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector, Routes } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { WebOrderPresentationModule } from './order/order.module';

export const routersConfig = {
    routers: [
        {
            path: '/web',
            children: [
                {
                    path: 'orders',
                    module: WebOrderPresentationModule,
                },
            ],
        },
    ],
    swaggerPath: 'web',
    swagger: () => {
        return new DocumentBuilder()
            .setTitle('Website API')
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
    },
};

@Module({
    imports: [LibRouterModule.register(routersConfig.routers)],
})
export class WebPresentationModule {}
