/**
 * HSV/HSB color space conversion utilities
 * @module color/hsv
 */

/**
 * Convert RGB to HSV
 * @param {number[]} rgb - RGB values [r, g, b] (0-255)
 * @returns {number[]} HSV values [h, s, v] (0-1)
 */
export function rgbToHsv(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;

    let h = 0;
    const s = max === 0 ? 0 : delta / max;
    const v = max;

    if (delta !== 0) {
        if (max === r) {
            h = (g - b) / delta + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h /= 6;
    }

    return [h, s, v];
}

/**
 * Convert HSV to RGB
 * @param {number[]} hsv - HSV values [h, s, v] (0-1)
 * @returns {number[]} RGB values [r, g, b] (0-255)
 */
export function hsvToRgb(hsv) {
    const h = hsv[0];
    const s = hsv[1];
    const v = hsv[2];

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;

    switch (i % 6) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}
