import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@infrastructure/logger/logger.service';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from '@presentation/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const logger = await app.resolve(LoggerService);

  logger.setContext('Application');

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

  await Promise.race([
    app.startAllMicroservices(),

    app.listen(port, async () => {
        Logger.log(`server is running on ${await app.getUrl()}`, 'Main');
    }),
]).catch((err) => console.log(err));
}
bootstrap();
