/**
 * CMYK color space conversion utilities
 * @module color/cmyk
 */

/**
 * Convert RGB to CMYK
 * @param {number[]} rgb - RGB values [r, g, b] (0-255)
 * @returns {number[]} CMYK values [c, m, y, k] (0-100)
 */
export function rgbToCmyk(rgb) {
    if (!rgb[0] && !rgb[1] && !rgb[2]) {
        return [0, 0, 0, 100];
    }

    let c = 1 - rgb[0] / 255;
    let m = 1 - rgb[1] / 255;
    let y = 1 - rgb[2] / 255;
    const k = Math.min(c, m, y);

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

/**
 * Convert CMYK to RGB
 * @param {number[]} cmyk - CMYK values [c, m, y, k] (0-100)
 * @returns {number[]} RGB values [r, g, b] (0-255)
 */
export function cmykToRgb(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;

    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
