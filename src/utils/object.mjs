/**
 * Object manipulation utilities
 * @module utils/object
 */

import { isObject, isArray, isFunction } from './type.mjs';

/**
 * Create a deep copy of an object or array
 * @param {*} source - Source object/array
 * @param {*} target - Target object/array (optional)
 * @returns {*} Deep copied object/array
 */
export function deepCopy(source, target = null) {
    if (!source || typeof source !== 'object') {
        return source;
    }

    if (isArray(source)) {
        const result = target || [];
        for (const key in source) {
            if (isFunction(source[key])) {
                result[key] = source[key];
            } else {
                result[key] = deepCopy(source[key]);
            }
        }
        return result;
    }

    if (isObject(source)) {
        const result = target || {};
        for (const key in source) {
            if (isFunction(source[key])) {
                result[key] = source[key];
            } else {
                result[key] = deepCopy(source[key]);
            }
        }
        return result;
    }

    return source;
}

/**
 * Create a shallow copy of an object (functions only)
 * @param {Object} source - Source object
 * @param {Object} target - Target object (optional)
 * @returns {Object} Shallow copied object
 */
export function shallowCopy(source, target = {}) {
    for (const key in source) {
        if (isFunction(source[key])) {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * Get all property names of an object
 * @param {Object} obj - Object to inspect
 * @returns {string[]} Array of property names
 */
export function getAllKeys(obj) {
    const keys = [];
    for (const key in obj) {
        keys.push(key);
    }
    return keys;
}

/**
 * Merge multiple objects into one
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
export function merge(...objects) {
    return Object.assign({}, ...objects);
}

/**
 * Deep merge multiple objects
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @returns {Object} Merged object
 */
export function deepMerge(target, ...sources) {
    if (!sources.length) {
        return target;
    }

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
}
