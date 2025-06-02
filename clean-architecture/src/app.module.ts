import { env } from 'process';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as joi from 'joi';
import { getEnvFilePath } from '@shared/utils';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';
import { TransformInterceptor } from '@presentation/interceptors/transform.interceptor';
import { JwtAuthGuard } from '@presentation/guards/jwt-auth.guard';
import { AllExceptionsFilter } from '@presentation/filters/all-exceptions.filter';
import { DomainExceptionsFilter } from '@presentation/filters/domain-exceptions.filter';

// Controllers
import { HealthController } from '@presentation/controllers/health.controller';

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
