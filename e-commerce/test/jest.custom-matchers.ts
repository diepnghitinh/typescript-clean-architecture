import { toBeArray, toBeOneOf, toBeNumber } from 'jest-extended';
import {expect} from "@jest/globals";

expect.extend({ toBeArray, toBeOneOf, toBeNumber });

declare module 'expect' {
    interface AsymmetricMatchers {
        toBeOneOf<E = unknown>(members: readonly E[]): void;
        toBeArray(): void;
        toBeNumber(): void;
    }
    interface Matchers<R> {
        toBeOneOf<E = unknown>(members: readonly E[]): R;
        toBeArray(): R;
        toBeNumber(): R;
    }
}