import {
    RepositoryProviders,
} from '@infrastructure/database/typeorm/typeorm.module';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmReportModuleOptions } from '@infrastructure/database/typeorm/typeorm.options';

const _configService = new ConfigService();

export const jestImports = [
    TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) =>
            typeOrmReportModuleOptions(_configService),
    }),
];

export const jestProviders = [ConfigService, ...RepositoryProviders];
