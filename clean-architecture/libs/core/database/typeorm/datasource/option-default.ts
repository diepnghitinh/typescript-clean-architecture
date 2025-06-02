import { DataSourceOptions } from 'typeorm';

import TypeOrmLogger from '../logger';

export const dataSourceDefaultOptions: Pick<
    DataSourceOptions,
    | 'type'
    | 'synchronize'
    | 'logging'
    | 'migrationsTransactionMode'
    | 'cache'
    | 'logger'
    | 'maxQueryExecutionTime'
    | 'namingStrategy'
> & {
    autoLoadEntities: boolean;
    timezone: string;
} = {
    type: 'postgres',
    synchronize: false,
    logging: true,
    autoLoadEntities: true,
    timezone: 'UTC',
    migrationsTransactionMode: 'none',
    cache: {
        type: 'database',
        tableName: 'configurable-table-query-result-cache',
        duration: 60_000,
        ignoreErrors: true,
    },
    logger: new TypeOrmLogger(),
    maxQueryExecutionTime: 1000,
};
