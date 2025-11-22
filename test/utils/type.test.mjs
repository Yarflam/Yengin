/**
 * Tests for type utilities
 */

import { isset, type, istype, isFunction, isObject, isArray, isString, isNumber } from '../../src/utils/type.mjs';

describe('Type Utilities', () => {
    describe('isset', () => {
        test('should return true for defined values', () => {
            expect(isset(0)).toBe(true);
            expect(isset('')).toBe(true);
            expect(isset(null)).toBe(true);
            expect(isset(false)).toBe(true);
        });

        test('should return false for undefined', () => {
            expect(isset(undefined)).toBe(false);
            let notDefined;
            expect(isset(notDefined)).toBe(false);
        });
    });

    describe('type', () => {
        test('should return constructor name by default', () => {
            expect(type([])).toBe('Array');
            expect(type({})).toBe('Object');
            expect(type('')).toBe('String');
            expect(type(1)).toBe('Number');
        });

        test('should return typeof when simple=true', () => {
            expect(type([], true)).toBe('object');
            expect(type({}, true)).toBe('object');
            expect(type('', true)).toBe('string');
            expect(type(1, true)).toBe('number');
        });

        test('should return false for undefined', () => {
            expect(type(undefined)).toBe(false);
        });
    });

    describe('istype', () => {
        test('should correctly identify types', () => {
            expect(istype([], 'Array')).toBe(true);
            expect(istype({}, 'Object')).toBe(true);
            expect(istype('', 'String')).toBe(true);
            expect(istype(1, 'Number')).toBe(true);
        });

        test('should work with simple mode', () => {
            expect(istype([], 'object', true)).toBe(true);
            expect(istype('', 'string', true)).toBe(true);
        });

        test('should return false for wrong types', () => {
            expect(istype([], 'Object')).toBe(false);
            expect(istype('', 'Number')).toBe(false);
        });
    });

    describe('isFunction', () => {
        test('should identify functions', () => {
            expect(isFunction(() => {})).toBe(true);
            expect(isFunction(function() {})).toBe(true);
            expect(isFunction(Array)).toBe(true);
        });

        test('should return false for non-functions', () => {
            expect(isFunction(null)).toBe(false);
            expect(isFunction({})).toBe(false);
            expect(isFunction('function')).toBe(false);
        });
    });

    describe('isObject', () => {
        test('should identify plain objects', () => {
            expect(isObject({})).toBe(true);
            expect(isObject({ a: 1 })).toBe(true);
        });

        test('should return false for non-objects', () => {
            expect(isObject(null)).toBe(false);
            expect(isObject([])).toBe(false);
            expect(isObject('object')).toBe(false);
        });
    });

    describe('isArray', () => {
        test('should identify arrays', () => {
            expect(isArray([])).toBe(true);
            expect(isArray([1, 2, 3])).toBe(true);
        });

        test('should return false for non-arrays', () => {
            expect(isArray({})).toBe(false);
            expect(isArray('array')).toBe(false);
        });
    });

    describe('isString', () => {
        test('should identify strings', () => {
            expect(isString('')).toBe(true);
            expect(isString('hello')).toBe(true);
        });

        test('should return false for non-strings', () => {
            expect(isString(123)).toBe(false);
            expect(isString(null)).toBe(false);
        });
    });

    describe('isNumber', () => {
        test('should identify numbers', () => {
            expect(isNumber(0)).toBe(true);
            expect(isNumber(123)).toBe(true);
            expect(isNumber(-45.67)).toBe(true);
        });

        test('should return false for NaN and non-numbers', () => {
            expect(isNumber(NaN)).toBe(false);
            expect(isNumber('123')).toBe(false);
            expect(isNumber(null)).toBe(false);
        });
    });
});
