/**
 * RGB color utilities
 * @module color/rgb
 */

/**
 * Convert RGB array to hexadecimal color string
 * @param {number[]} rgb - RGB values [r, g, b]
 * @param {boolean} includeHash - Include # prefix
 * @returns {string} Hexadecimal color string
 */
export function rgbToHex(rgb, includeHash = true) {
    const hex = rgb.slice(0, 3).map((value) => {
        const hexValue = value.toString(16).toUpperCase();
        return hexValue.length === 2 ? hexValue : '0' + hexValue;
    }).join('');

    return includeHash ? '#' + hex : hex;
}

/**
 * Convert hexadecimal color string to RGB array
 * @param {string} hex - Hexadecimal color string
 * @returns {number[]} RGB values [r, g, b]
 */
export function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const rgb = [];

    for (let i = 0; i < 6; i += 2) {
        rgb.push(parseInt(cleanHex.substr(i, 2), 16));
    }

    return rgb;
}

/**
 * Divide a number into random RGB components
 * @param {number} total - Total value to divide
 * @returns {number[]} RGB values [r, g, b]
 */
export function divideToRgb(total) {
    const rgb = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];

    const sum = rgb.reduce((a, b) => a + b, 0);
    const remaining = total - sum;

    for (let i = 0; i < 3; i++) {
        const adjustment = Math.min(rgb[i], Math.abs(remaining));
        if (rgb[i] < total && remaining > 0) {
            rgb[i] += adjustment;
        } else if (remaining < 0) {
            rgb[i] -= adjustment;
        }
    }

    return rgb.map((v) => Math.max(0, Math.min(255, v)));
}
