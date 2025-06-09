import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '@core/presentation/filters/all-exceptions.filter';
import { AppModule } from './app.module';
import { LoggerService } from '@core/infrastructure/logger/logger.service';
import helmet from 'helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { presentationRoutes } from '@presentation/routers.swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { filterEndpointByVersion } from '@core/swagger/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');
    const logger = await app.resolve(LoggerService);

    logger.setContext('Application');

    app.setGlobalPrefix('v1');

    // Security middleware
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                },
            },
        }),
    );

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Enable CORS with security settings
    const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS')?.split(',') || [
        `http://localhost:${port}`,
    ];
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
    });

    // Global exception filter
    const exceptionLogger = await app.resolve(LoggerService);
    app.useGlobalFilters(new AllExceptionsFilter(exceptionLogger));

    // Swagger init
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: [''],
        prefix: '',
    });

    presentationRoutes.forEach((router) => {
        const document = SwaggerModule.createDocument(app, router.swagger());
        const swaggerPath = `swagger/${router.swaggerPath}`;
        Logger.log(`swagger is running on ${swaggerPath}`, 'Main');
        document.paths = filterEndpointByVersion(document, router.swaggerPath, ['health']);
        SwaggerModule.setup(swaggerPath, app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
    });

    await Promise.race([
        app.startAllMicroservices(),

        app.listen(port, async () => {
            Logger.log(`server is running on ${await app.getUrl()}`, 'Main');
        }),
    ]).catch((err) => console.log(err));
}
bootstrap();
