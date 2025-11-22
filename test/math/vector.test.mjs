/**
 * Tests for math utilities - Vector2D
 */

import { Vector2D, toRadian, toAngle, toCartesian, toPolar } from '../../src/math/vector.mjs';

describe('Vector Mathematics', () => {
    describe('Vector2D', () => {
        test('should create vector from points', () => {
            const v = new Vector2D([0, 0], [3, 4]);
            expect(v.a).toEqual([0, 0]);
            expect(v.b).toEqual([3, 4]);
        });

        test('should create vector from coordinates', () => {
            const v = new Vector2D(3, 4);
            expect(v.a).toEqual([0, 0]);
            expect(v.b).toEqual([3, 4]);
        });

        test('should calculate length', () => {
            const v = new Vector2D([0, 0], [3, 4]);
            expect(v.getLength()).toBe(5);
        });

        test('should normalize vector', () => {
            const v = new Vector2D([0, 0], [3, 4]);
            const norm = v.getNorm();
            expect(norm[0]).toBeCloseTo(0.6);
            expect(norm[1]).toBeCloseTo(0.8);
        });

        test('should add vectors', () => {
            const v1 = new Vector2D([0, 0], [1, 2]);
            const v2 = new Vector2D([0, 0], [3, 4]);
            const result = v1.add(v2);
            expect(result.b).toEqual([4, 6]);
        });

        test('should subtract vectors', () => {
            const v1 = new Vector2D([0, 0], [5, 6]);
            const v2 = new Vector2D([0, 0], [2, 3]);
            const result = v1.subtract(v2);
            expect(result.b).toEqual([3, 3]);
        });

        test('should multiply by scalar', () => {
            const v = new Vector2D([0, 0], [2, 3]);
            const result = v.multiply(2);
            expect(result.b).toEqual([4, 6]);
        });

        test('should calculate dot product', () => {
            const v1 = new Vector2D([0, 0], [1, 2]);
            const v2 = new Vector2D([0, 0], [3, 4]);
            expect(v1.dot(v2)).toBe(11); // 1*3 + 2*4
        });
    });

    describe('Angle Conversions', () => {
        test('should convert angle to radians', () => {
            expect(toRadian(180)).toBeCloseTo(0);
            expect(toRadian(270)).toBeCloseTo(Math.PI / 2);
        });

        test('should convert radians to angle', () => {
            expect(toAngle(0)).toBeCloseTo(180);
            expect(toAngle(Math.PI)).toBeCloseTo(360);
        });

        test('should convert angle to Cartesian', () => {
            const coords = toCartesian(180);
            expect(coords[0]).toBeCloseTo(1);
            expect(coords[1]).toBeCloseTo(0);
        });

        test('should convert Cartesian to polar', () => {
            const angle = toPolar(1, 0);
            expect(angle).toBeCloseTo(180);
        });
    });
});
