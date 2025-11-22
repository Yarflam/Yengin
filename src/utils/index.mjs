/**
 * Utility functions module
 * @module utils
 */

export * from './type.mjs';
export * from './object.mjs';
export * from './string.mjs';
export * from './array.mjs';
export * from './format.mjs';

/**
 * Get current timestamp
 * @returns {number} Current time in milliseconds
 */
export function getTime() {
    return new Date().getTime();
}

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function rand(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Generate random integer between min and max
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random integer
 */
export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generate array of random integers
 * @param {number} count - Number of integers to generate
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number[]} Array of random integers
 */
export function randIntArray(count, min, max) {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(randInt(min, max));
    }
    return array;
}

/**
 * Modulo operation (handles negative numbers correctly)
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Modulo result
 */
export function mod(a, b) {
    while (a < 0) {
        a += b;
    }
    return a % b;
}

/**
 * Modular inverse
 * @param {number} a - Number
 * @param {number} b - Modulus
 * @param {boolean} deep - Return full result object
 * @returns {number|Object} Modular inverse or result object
 */
export function modInv(a, b, deep = false) {
    let result = { x: 0, y: 1 };

    if (a % b) {
        result = modInv(b, a % b, true);
        result = {
            x: result.y,
            y: result.x - result.y * Math.floor(a / b)
        };
    }

    return deep ? result : result.x;
}

/**
 * Greatest common divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
export function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
