/**
 * Tests for object utilities
 */

import { deepCopy, shallowCopy, getAllKeys, merge, deepMerge } from '../../src/utils/object.mjs';

describe('Object Utilities', () => {
    describe('deepCopy', () => {
        test('should deep copy objects', () => {
            const original = { a: 1, b: { c: 2 } };
            const copy = deepCopy(original);

            expect(copy).toEqual(original);
            expect(copy).not.toBe(original);
            expect(copy.b).not.toBe(original.b);
        });

        test('should deep copy arrays', () => {
            const original = [1, [2, 3], { a: 4 }];
            const copy = deepCopy(original);

            expect(copy).toEqual(original);
            expect(copy).not.toBe(original);
            expect(copy[1]).not.toBe(original[1]);
        });

        test('should preserve functions', () => {
            const fn = () => 'test';
            const original = { a: 1, fn };
            const copy = deepCopy(original);

            expect(copy.fn).toBe(fn);
        });

        test('should handle primitives', () => {
            expect(deepCopy(123)).toBe(123);
            expect(deepCopy('test')).toBe('test');
            expect(deepCopy(null)).toBe(null);
        });
    });

    describe('shallowCopy', () => {
        test('should copy functions only', () => {
            const fn1 = () => 'a';
            const fn2 = () => 'b';
            const original = { a: 1, fn1, fn2 };
            const copy = shallowCopy(original);

            expect(copy.fn1).toBe(fn1);
            expect(copy.fn2).toBe(fn2);
            expect(copy.a).toBeUndefined();
        });
    });

    describe('getAllKeys', () => {
        test('should return all object keys', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const keys = getAllKeys(obj);

            expect(keys).toEqual(['a', 'b', 'c']);
        });

        test('should return empty array for empty object', () => {
            expect(getAllKeys({})).toEqual([]);
        });
    });

    describe('merge', () => {
        test('should merge multiple objects', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            const obj3 = { c: 3 };
            const result = merge(obj1, obj2, obj3);

            expect(result).toEqual({ a: 1, b: 2, c: 3 });
        });

        test('should not mutate original objects', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            merge(obj1, obj2);

            expect(obj1).toEqual({ a: 1 });
        });
    });

    describe('deepMerge', () => {
        test('should deep merge nested objects', () => {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { b: { d: 3 }, e: 4 };
            const result = deepMerge(obj1, obj2);

            expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
        });

        test('should overwrite primitives', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const result = deepMerge(obj1, obj2);

            expect(result).toEqual({ a: 1, b: 3, c: 4 });
        });
    });
});
