import '@shared/utils/dotenv';

import { join } from 'path';
import { cwd, env } from 'process';

import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '@nestjs/common';
import TypeOrmLogger from '@core/database/typeorm/logger';

const configService = new ConfigService();

export const dataSourceOptions = (
    configService: ConfigService,
): DataSourceOptions & { autoLoadEntities: boolean; timezone: string } => ({
    type: 'postgres',
    entities: [join(__dirname, '../../**/*.orm.entity.{ts,js}')],
    synchronize: false,
    logging: true,
    autoLoadEntities: false,
    migrations: [join(cwd(), `database/migrations/${env.NODE_ENV}/*`)],
    migrationsRun: process.env.NODE_ENV === 'production',
    timezone: 'UTC',
    useUTC: true,
    maxQueryExecutionTime: 15000,
    migrationsTransactionMode: 'all',
    cache: false,
    logger: new TypeOrmLogger(),
    replication: {
        master: {
            host: configService.get('POSTGRESQL_HOST'),
            port: +configService.get('POSTGRESQL_PORT'),
            database: configService.get('POSTGRESQL_DB_NAME'),
            username: configService.get('POSTGRESQL_DB_USERNAME'),
            password: configService.get('POSTGRESQL_DB_PASSWORD'),
        },
        slaves: [
            {
                host: configService.get('POSTGRESQL_HOST'),
                port: +configService.get('POSTGRESQL_PORT'),
                database: configService.get('POSTGRESQL_DB_NAME'),
                username: configService.get('POSTGRESQL_DB_USERNAME'),
                password: configService.get('POSTGRESQL_DB_PASSWORD'),
            },
        ],
    },
    ssl: configService.get('POSTGRES_SSL_MODE', false),
    extra: {
        ssl:
        configService.get('POSTGRES_SSL_MODE', false) == 'true'
            ? {
                rejectUnauthorized: !configService.get<boolean>('SSL_MODE', false),
            }
            : null,
       
            connectTimeoutMS: 10000, // 10 giây
            statement_timeout: 5000, // 5 giây
    },
});

const dataSource = new DataSource(dataSourceOptions(configService));

export const typeOrmReportModuleOptions = (configService: ConfigService) => {
    return {
        ...dataSourceOptions(configService),
        migrations: [],
    };
};

export default dataSource;
