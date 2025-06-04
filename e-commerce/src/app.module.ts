import { env } from 'process';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as joi from 'joi';
import { getEnvFilePath } from '@shared/utils';
import { LoggerModule } from '@core/infrastructure/logger/logger.module';
import { LoggingInterceptor } from '@core/presentation/interceptors/logging.interceptor';
import { TransformInterceptor } from '@core/presentation/interceptors/transform.interceptor';
import { JwtAuthGuard } from '@core/presentation/guards/jwt-auth.guard';
import { AllExceptionsFilter } from '@core/presentation/filters/all-exceptions.filter';
import { DomainExceptionsFilter } from '@core/presentation/filters/domain-exceptions.filter';

// Controllers
import { HealthController } from '@core/presentation/controllers/health.controller';
import { TypeOrmInfrastructureModule } from '@infrastructure/database/typeorm/typeorm.module';
import { PresentationModule } from '@presentation/presentation.module';
import { MessagingInfrastructureModule } from '@infrastructure/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(env.NODE_ENV),
      expandVariables: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
      }),
    }),

    // Logging
    LoggerModule,

    // Database
    TypeOrmInfrastructureModule,

    // Messaging
    MessagingInfrastructureModule,

    PresentationModule,
  ],
  controllers: [
    HealthController
  ],
  providers: [
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },

    // Global filters
    {
      provide: APP_FILTER,
      useClass: DomainExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    // Global guards
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
