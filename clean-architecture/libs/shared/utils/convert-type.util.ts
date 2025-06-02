/* eslint-disable @typescript-eslint/no-explicit-any */
import { utilConfigService } from './dotenv';

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return function (key: any, value: any) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export const stringify = (value: any, space: number = 0): string =>
JSON.stringify(
    value,
    getCircularReplacer(),
    utilConfigService.get('NODE_ENV') !== 'local' ? 0 : space,
);
