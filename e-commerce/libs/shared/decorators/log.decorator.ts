import { Logger } from '@nestjs/common';
import '../../shared/utils/dotenv';
import 'reflect-metadata';
import { stringify } from '@shared/utils/convert-type.util';
export type level = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

const isDebug = process.env.IS_DEBUG;
// log-call.decorator.ts
function LogMethodExecution() {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const logger = new Logger(`${target.constructor.name}#${propertyKey}`);
        const originalMethod = descriptor.value;
        descriptor.value = async function () {
            logger.log(`[START] `);
            isDebug && logger.debug(`[ARGS] ${stringify(Object.values(arguments))}`);
            const start = performance.now();
            try {
                return await originalMethod.apply(this, arguments);
            } catch (error: any) {
                logger.error(`[ERROR] ${stringify(error.stack)}`);
                throw error;
            } finally {
                const end = performance.now();
                logger.log(`[END] executed in ${(end - start).toFixed(3)}ms`);
            }
        };

        Reflect.getMetadataKeys(originalMethod).forEach((key) => {
            const metadata = Reflect.getMetadata(key, originalMethod);
            Reflect.defineMetadata(key, metadata, descriptor.value);
        });
    };
}

export function LogExecution() {
    return function (target: object, propertyKey?: string, descriptor?: PropertyDescriptor) {
        if (descriptor) return LogMethodExecution()(target, propertyKey, descriptor);

        const methods = Object.getOwnPropertyNames(target['prototype']).filter(
            (property) =>
                typeof target['prototype'][property] === 'function' && property !== 'constructor',
        );

        const descriptors = Object.getOwnPropertyDescriptors(target['prototype']);

        for (const method of methods) {
            const descriptor = descriptors[method];

            if (descriptor) {
                LogMethodExecution()(target['prototype'], method, descriptor);
                Object.defineProperty(target['prototype'], method, descriptor);
            }
        }
    };
}
