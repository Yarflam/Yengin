/**
 * Tests for string utilities
 */

import { ord, chr, ucfirst, strRepeat, leftPad, rightPad, formatStr, subcount, isIn } from '../../src/utils/string.mjs';

describe('String Utilities', () => {
    describe('ord', () => {
        test('should return character code', () => {
            expect(ord('A')).toBe(65);
            expect(ord('a')).toBe(97);
            expect(ord('0')).toBe(48);
        });
    });

    describe('chr', () => {
        test('should return character from code', () => {
            expect(chr(65)).toBe('A');
            expect(chr(97)).toBe('a');
            expect(chr(48)).toBe('0');
        });
    });

    describe('ucfirst', () => {
        test('should uppercase first character', () => {
            expect(ucfirst('hello')).toBe('Hello');
            expect(ucfirst('HELLO')).toBe('HELLO');
            expect(ucfirst('a')).toBe('A');
        });
    });

    describe('strRepeat', () => {
        test('should repeat string n times', () => {
            expect(strRepeat('a', 3)).toBe('aaa');
            expect(strRepeat('ab', 2)).toBe('abab');
            expect(strRepeat('x', 0)).toBe('');
        });
    });

    describe('leftPad', () => {
        test('should remove leading character', () => {
            expect(leftPad('/path', '/')).toBe('path');
            expect(leftPad('path', '/')).toBe('path');
        });
    });

    describe('rightPad', () => {
        test('should remove trailing character', () => {
            expect(rightPad('path/', '/')).toBe('path');
            expect(rightPad('path', '/')).toBe('path');
        });
    });

    describe('formatStr', () => {
        test('should format with indexed placeholders', () => {
            const result = formatStr('Hello {0}, you are {1} years old', ['John', 25]);
            expect(result).toBe('Hello John, you are 25 years old');
        });

        test('should format with %s placeholders', () => {
            const result = formatStr('Hello %s, you are %s years old', ['John', 25]);
            expect(result).toBe('Hello John, you are 25 years old');
        });

        test('should handle mixed placeholders', () => {
            const result = formatStr('{0} is %s years old', ['John', 25]);
            expect(result).toBe('John is 25 years old');
        });
    });

    describe('subcount', () => {
        test('should count substring occurrences', () => {
            expect(subcount('l', 'hello')).toBe(2);
            expect(subcount('ll', 'hello')).toBe(1);
            expect(subcount('x', 'hello')).toBe(0);
        });
    });

    describe('isIn', () => {
        test('should check if string is in haystack', () => {
            expect(isIn('lo', 'hello')).toBe(true);
            expect(isIn('x', 'hello')).toBe(false);
        });

        test('should check if all strings in array are in haystack', () => {
            expect(isIn(['h', 'e'], 'hello')).toBe(true);
            expect(isIn(['h', 'x'], 'hello')).toBe(false);
        });
    });
});
