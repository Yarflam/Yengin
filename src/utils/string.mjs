/**
 * String manipulation utilities
 * @module utils/string
 */

/**
 * Get character code at position 0
 * @param {string} value - Character
 * @returns {number} Character code
 */
export function ord(value) {
    return value.charCodeAt(0);
}

/**
 * Convert character code to character
 * @param {number} value - Character code
 * @returns {string} Character
 */
export function chr(value) {
    return String.fromCharCode(value);
}

/**
 * Uppercase first character
 * @param {string} str - Input string
 * @returns {string} String with first character uppercased
 */
export function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Repeat a string n times
 * @param {string} str - String to repeat
 * @param {number} count - Number of repetitions
 * @returns {string} Repeated string
 */
export function strRepeat(str, count) {
    return str.repeat(count);
}

/**
 * Remove leading character if present
 * @param {string} str - Input string
 * @param {string} char - Character to remove
 * @returns {string} String without leading character
 */
export function leftPad(str, char) {
    if (str.length && str[0] === char) {
        return str.slice(1);
    }
    return str;
}

/**
 * Remove trailing character if present
 * @param {string} str - Input string
 * @param {string} char - Character to remove
 * @returns {string} String without trailing character
 */
export function rightPad(str, char) {
    if (str.length && str[str.length - 1] === char) {
        return str.slice(0, -1);
    }
    return str;
}

/**
 * Format string with placeholders
 * @param {string} str - Template string with {0}, {1}, ... or %s placeholders
 * @param {Array} values - Values to substitute
 * @returns {string} Formatted string
 */
export function formatStr(str, values) {
    const regex = /({(\d*)}|%s)/g;
    let nchar = 0;

    return str.replace(regex, (match, p1, p2) => {
        if (p2 !== undefined && p2.length > 0) {
            const index = parseInt(p2);
            // Update nchar to skip explicitly indexed positions
            if (index >= nchar) {
                nchar = index + 1;
            }
            return index < values.length ? values[index] : '';
        } else if (!p2 || p2.length === 0) {
            if (nchar < values.length) {
                return values[nchar++];
            }
        }
        return '';
    });
}

/**
 * Count occurrences of substring
 * @param {string} needle - Substring to search for
 * @param {string} haystack - String to search in
 * @returns {number} Number of occurrences
 */
export function subcount(needle, haystack) {
    let count = 0;
    let index = 0;

    while ((index = haystack.indexOf(needle, index)) >= 0) {
        count++;
        index++;
    }

    return count;
}

/**
 * Check if needle(s) exist in haystack
 * @param {string|string[]} needle - String(s) to search for
 * @param {string} haystack - String to search in
 * @returns {boolean} True if all needles found
 */
export function isIn(needle, haystack) {
    if (Array.isArray(needle)) {
        return needle.every((n) => haystack.includes(n));
    }
    return haystack.includes(needle);
}
