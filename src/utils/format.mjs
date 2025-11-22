/**
 * Formatting and encoding utilities
 * @module utils/format
 */

const B64_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Encode string to base64
 * @param {string} input - String to encode
 * @returns {string} Base64 encoded string
 */
export function b64encode(input) {
    let output = '';
    let remainder = 0;

    for (let i = 0; ; i++) {
        const charCode = i < input.length ? input.charCodeAt(i) : 0;
        const hasChar = charCode >= 0;

        if (!hasChar && !input[i - 1]) {
            break;
        }

        if (!(i % 3) && input[i - 1]) {
            output += B64_ALPHA[remainder];
            remainder = 0;
        }

        if (i % 4 === 0 && output.length % 4 !== 0) {
            output += '=';
            remainder = 0;
            continue;
        }

        const shift = ((i % 3) + 1) * 2;
        output += B64_ALPHA[remainder + (charCode >> shift)];
        remainder = (charCode - ((charCode >> shift) << shift)) << (6 - shift);
    }

    return output;
}

/**
 * Decode base64 string
 * @param {string} input - Base64 string
 * @returns {string} Decoded string
 */
export function b64decode(input) {
    let output = '';
    let remainder = 0;

    for (let i = 0; i < input.length; i++) {
        const charCode = B64_ALPHA.indexOf(input[i]);

        if (charCode < 0) {
            continue;
        }

        const shift = (6 - ((i % 4) * 2)) % 6;

        if (i % 4) {
            output += String.fromCharCode(remainder + (charCode >> shift));
            remainder = (charCode - ((charCode >> shift) << shift)) << (8 - shift);
        } else {
            remainder = charCode << 2;
        }
    }

    return output;
}

/**
 * Convert number to hexadecimal
 * @param {number} num - Number to convert
 * @returns {string} Hexadecimal string
 */
export function toHex(num) {
    return num.toString(16).toUpperCase();
}

/**
 * Parse URL and extract components
 * @param {string} url - URL to parse
 * @returns {Object|null} URL components or null
 */
export function decodeUrl(url) {
    const regex = /^((([A-Za-z]+):)?\/\/((([^:.]+)\.){0,2})([^:/]+)(:([0-9]+))?(\/([^/?.]+\/)*))([^?]+)?(\?([^#]+))?(#.+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

/**
 * Get all regex matches in a string
 * @param {string} pattern - Regular expression pattern
 * @param {string} content - Content to search
 * @returns {Array} Array of matches
 */
export function pregMatchAll(pattern, content) {
    const output = [];
    const regex = new RegExp(pattern, 'g');
    let match;

    while ((match = regex.exec(content)) !== null) {
        output.push(match);
    }

    return output;
}

/**
 * Convert object to URI query string
 * @param {Object} obj - Object to convert
 * @returns {string} URI query string
 */
export function objectToUri(obj) {
    const parts = [];
    for (const key in obj) {
        parts.push(`${key}=${encodeURIComponent(obj[key])}`);
    }
    return parts.join('&');
}

/**
 * Parse JSON safely
 * @param {string} content - JSON string
 * @returns {*} Parsed object or empty object on error
 */
export function jsonParse(content) {
    try {
        return JSON.parse(content);
    } catch (e) {
        return {};
    }
}
