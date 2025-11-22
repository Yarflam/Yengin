/**
 * Tests for color utilities
 */

import { rgbToHex, hexToRgb } from '../../src/color/rgb.mjs';
import { rgbToHsl, hslToRgb } from '../../src/color/hsl.mjs';
import { rgbToHsv, hsvToRgb } from '../../src/color/hsv.mjs';
import { rgbToCmyk, cmykToRgb } from '../../src/color/cmyk.mjs';

describe('Color Conversions', () => {
    describe('RGB <-> Hex', () => {
        test('should convert RGB to hex', () => {
            expect(rgbToHex([255, 0, 0])).toBe('#FF0000');
            expect(rgbToHex([0, 255, 0])).toBe('#00FF00');
            expect(rgbToHex([0, 0, 255])).toBe('#0000FF');
        });

        test('should convert RGB to hex without hash', () => {
            expect(rgbToHex([255, 0, 0], false)).toBe('FF0000');
        });

        test('should convert hex to RGB', () => {
            expect(hexToRgb('#FF0000')).toEqual([255, 0, 0]);
            expect(hexToRgb('00FF00')).toEqual([0, 255, 0]);
        });
    });

    describe('RGB <-> HSL', () => {
        test('should convert RGB to HSL', () => {
            const hsl = rgbToHsl([255, 0, 0]);
            expect(hsl[0]).toBeCloseTo(0);
            expect(hsl[1]).toBeCloseTo(1);
            expect(hsl[2]).toBeCloseTo(0.5);
        });

        test('should convert HSL to RGB', () => {
            const rgb = hslToRgb([0, 1, 0.5]);
            expect(rgb[0]).toBe(255);
            expect(rgb[1]).toBe(0);
            expect(rgb[2]).toBe(0);
        });

        test('should handle grayscale', () => {
            const hsl = rgbToHsl([128, 128, 128]);
            expect(hsl[1]).toBeCloseTo(0);

            const rgb = hslToRgb([0, 0, 0.5]);
            expect(rgb[0]).toBe(128);
            expect(rgb[1]).toBe(128);
            expect(rgb[2]).toBe(128);
        });
    });

    describe('RGB <-> HSV', () => {
        test('should convert RGB to HSV', () => {
            const hsv = rgbToHsv([255, 0, 0]);
            expect(hsv[0]).toBeCloseTo(0);
            expect(hsv[1]).toBeCloseTo(1);
            expect(hsv[2]).toBeCloseTo(1);
        });

        test('should convert HSV to RGB', () => {
            const rgb = hsvToRgb([0, 1, 1]);
            expect(rgb[0]).toBe(255);
            expect(rgb[1]).toBe(0);
            expect(rgb[2]).toBe(0);
        });
    });

    describe('RGB <-> CMYK', () => {
        test('should convert RGB to CMYK', () => {
            const cmyk = rgbToCmyk([255, 0, 0]);
            expect(cmyk[0]).toBe(0);
            expect(cmyk[1]).toBe(100);
            expect(cmyk[2]).toBe(100);
            expect(cmyk[3]).toBe(0);
        });

        test('should convert CMYK to RGB', () => {
            const rgb = cmykToRgb([0, 100, 100, 0]);
            expect(rgb[0]).toBe(255);
            expect(rgb[1]).toBe(0);
            expect(rgb[2]).toBe(0);
        });

        test('should handle black', () => {
            const cmyk = rgbToCmyk([0, 0, 0]);
            expect(cmyk[3]).toBe(100);
        });
    });

    describe('Round-trip conversions', () => {
        test('RGB -> HSL -> RGB should be consistent', () => {
            const original = [128, 64, 192];
            const hsl = rgbToHsl(original);
            const converted = hslToRgb(hsl);
            expect(converted[0]).toBeCloseTo(original[0], 0);
            expect(converted[1]).toBeCloseTo(original[1], 0);
            expect(converted[2]).toBeCloseTo(original[2], 0);
        });

        test('RGB -> HSV -> RGB should be consistent', () => {
            const original = [128, 64, 192];
            const hsv = rgbToHsv(original);
            const converted = hsvToRgb(hsv);
            expect(converted[0]).toBeCloseTo(original[0], 0);
            expect(converted[1]).toBeCloseTo(original[1], 0);
            expect(converted[2]).toBeCloseTo(original[2], 0);
        });
    });
});
