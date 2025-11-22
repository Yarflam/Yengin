/**
 * Tests for Complex numbers
 */

import { Complex } from '../../src/math/complex.mjs';

describe('Complex Numbers', () => {
    test('should create complex number', () => {
        const c = new Complex(3, 4);
        expect(c.r).toBe(3);
        expect(c.i).toBe(4);
    });

    test('should convert to string', () => {
        expect(new Complex(3, 4).toString()).toBe('3 + 4i');
        expect(new Complex(3, -4).toString()).toBe('3 - 4i');
        expect(new Complex(0, 4).toString()).toBe('4i');
        expect(new Complex(3, 0).toString()).toBe('3');
    });

    test('should add complex numbers', () => {
        const c1 = new Complex(3, 4);
        const c2 = new Complex(1, 2);
        const result = c1.add(c2);
        expect(result.r).toBe(4);
        expect(result.i).toBe(6);
    });

    test('should subtract complex numbers', () => {
        const c1 = new Complex(5, 6);
        const c2 = new Complex(2, 3);
        const result = c1.subtract(c2);
        expect(result.r).toBe(3);
        expect(result.i).toBe(3);
    });

    test('should multiply complex numbers', () => {
        const c1 = new Complex(3, 2);
        const c2 = new Complex(1, 4);
        const result = c1.multiply(c2);
        // (3+2i)(1+4i) = 3 + 12i + 2i + 8i² = 3 + 14i - 8 = -5 + 14i
        expect(result.r).toBe(-5);
        expect(result.i).toBe(14);
    });

    test('should divide complex numbers', () => {
        const c1 = new Complex(4, 2);
        const c2 = new Complex(1, 1);
        const result = c1.divide(c2);
        // (4+2i)/(1+i) = (4+2i)(1-i)/(1+1) = (4-4i+2i-2i²)/2 = (6-2i)/2 = 3-i
        expect(result.r).toBe(3);
        expect(result.i).toBe(-1);
    });

    test('should negate complex number', () => {
        const c = new Complex(3, 4);
        const result = c.negate();
        expect(result.r).toBe(-3);
        expect(result.i).toBe(-4);
    });

    test('should calculate distance', () => {
        const c1 = new Complex(0, 0);
        const c2 = new Complex(3, 4);
        expect(c1.distance(c2)).toBe(5);
    });

    test('should add with real number', () => {
        const c = new Complex(3, 4);
        const result = c.add(2);
        expect(result.r).toBe(5);
        expect(result.i).toBe(4);
    });
});
