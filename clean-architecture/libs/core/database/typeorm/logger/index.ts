import { Logger as NestLogger } from '@nestjs/common';
import { stringify } from '@shared/utils/convert-type.util';

import { Logger as TypeOrmLogger } from 'typeorm';

class DatabaseLogger implements TypeOrmLogger {
    private readonly logger = new NestLogger('SQL');

    logQuery(query: string, parameters?: unknown[]) {
        this.logger.verbose(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`);
    }

    logQueryError(error: string, query: string, parameters?: unknown[]) {
        this.logger.error(
            `${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`,
        );
    }

    logQuerySlow(time: number, query: string, parameters?: unknown[]) {
        this.logger.warn(
            `[SLOW] Time: ${time} -- Parameters: ${this.stringifyParameters(
                parameters,
            )} -- ${query}`,
        );
    }

    logMigration(message: string) {
        this.logger.log(message);
    }

    logSchemaBuild(message: string) {
        this.logger.log(message);
    }

    log(level: 'log' | 'info' | 'warn' | 'verbose', message: string) {
        switch (level) {
            case 'info':
                return this.logger.debug(message);
            case 'warn':
                return this.logger.warn(message);
            case 'log':
                return this.logger.log(message);
            case 'verbose':
                return this.logger.verbose(message);
            default:
                return this.logger.log(message); // Default to log level if unknown
        }
    }

    private stringifyParameters(parameters?: unknown[]) {
        try {
            return stringify(parameters);
        } catch {
            return '';
        }
    }
}

export default DatabaseLogger;
