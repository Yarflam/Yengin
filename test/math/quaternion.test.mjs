/**
 * Tests for Quaternions
 */

import { Quaternion } from '../../src/math/quaternion.mjs';

describe('Quaternions', () => {
    test('should create quaternion', () => {
        const q = new Quaternion(1, 2, 3, 4);
        expect(q.w).toBe(1);
        expect(q.i).toBe(2);
        expect(q.j).toBe(3);
        expect(q.k).toBe(4);
    });

    test('should convert to string', () => {
        const q = new Quaternion(1, 2, -3, 4);
        expect(q.toString()).toBe('1 + 2i - 3j + 4k');
    });

    test('should add quaternions', () => {
        const q1 = new Quaternion(1, 2, 3, 4);
        const q2 = new Quaternion(5, 6, 7, 8);
        const result = q1.add(q2);
        expect(result.w).toBe(6);
        expect(result.i).toBe(8);
        expect(result.j).toBe(10);
        expect(result.k).toBe(12);
    });

    test('should subtract quaternions', () => {
        const q1 = new Quaternion(5, 6, 7, 8);
        const q2 = new Quaternion(1, 2, 3, 4);
        const result = q1.subtract(q2);
        expect(result.w).toBe(4);
        expect(result.i).toBe(4);
        expect(result.j).toBe(4);
        expect(result.k).toBe(4);
    });

    test('should multiply quaternions (Hamilton product)', () => {
        const q1 = new Quaternion(1, 0, 0, 0);
        const q2 = new Quaternion(0, 1, 0, 0);
        const result = q1.multiply(q2);
        expect(result.i).toBe(1);
    });

    test('should negate quaternion', () => {
        const q = new Quaternion(1, 2, 3, 4);
        const result = q.negate();
        expect(result.w).toBe(-1);
        expect(result.i).toBe(-2);
        expect(result.j).toBe(-3);
        expect(result.k).toBe(-4);
    });

    test('should calculate conjugate', () => {
        const q = new Quaternion(1, 2, 3, 4);
        const result = q.conjugate();
        expect(result.w).toBe(1);
        expect(result.i).toBe(-2);
        expect(result.j).toBe(-3);
        expect(result.k).toBe(-4);
    });

    test('should calculate distance', () => {
        const q1 = new Quaternion(0, 0, 0, 0);
        const q2 = new Quaternion(1, 2, 2, 0);
        expect(q1.distance(q2)).toBe(3);
    });

    test('should create from Euler angles', () => {
        const q = Quaternion.fromEulerAngles(180, 180, 180);
        expect(q).toBeInstanceOf(Quaternion);
    });

    test('should get Euler angles', () => {
        const q = new Quaternion(1, 0, 0, 0);
        const angles = q.getEulerAngles();
        expect(angles).toHaveLength(3);
    });
});
