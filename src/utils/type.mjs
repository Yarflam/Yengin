/**
 * Type checking utilities
 * @module utils/type
 */

/**
 * Check if a value is defined (not undefined)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is defined
 */
export function isset(value) {
    return value !== undefined;
}

/**
 * Get the type of a value
 * @param {*} value - Value to check
 * @param {boolean} simple - If true, return typeof result
 * @returns {string|boolean} Type name or false if undefined
 */
export function type(value, simple = false) {
    if (!isset(value)) {
        return false;
    }

    if (simple) {
        return typeof value;
    }

    return value.constructor.name;
}

/**
 * Check if a value is of a specific type
 * @param {*} value - Value to check
 * @param {string} typeName - Expected type name
 * @param {boolean} simple - If true, use typeof instead of constructor.name
 * @returns {boolean} True if value matches type
 */
export function istype(value, typeName, simple = false) {
    if (!isset(value)) {
        return false;
    }

    return type(value, simple) === typeName;
}

/**
 * Check if value is a function
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * Check if value is an object
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if value is an array
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * Check if value is a string
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * Check if value is a number
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
