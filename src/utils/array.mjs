/**
 * Array utilities
 * @module utils/array
 */

/**
 * Get the last element of an array
 * @param {Array} array - Input array
 * @returns {*} Last element or null if empty
 */
export function end(array) {
    return array.length ? array[array.length - 1] : null;
}

/**
 * Quick sort for arrays with custom comparator
 * @param {Array} array - Array to sort
 * @param {Function} compareFn - Comparison function
 * @returns {Array} Sorted array
 */
export function quickSortArray(array, compareFn) {
    if (!array.length) {
        return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
        if (compareFn(pivot, array[i]) > 0) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSortArray(left, compareFn), pivot, ...quickSortArray(right, compareFn)];
}

/**
 * Quick sort for objects with custom comparator
 * @param {Object} obj - Object to sort
 * @param {Function} compareFn - Comparison function
 * @returns {Object} Sorted object
 */
export function quickSortObject(obj, compareFn) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj;
    }

    const pivot = keys[0];
    const left = {};
    const right = {};

    for (let i = 1; i < keys.length; i++) {
        const key = keys[i];
        if (compareFn(obj[pivot], obj[key]) > 0) {
            left[key] = obj[key];
        } else {
            right[key] = obj[key];
        }
    }

    return {
        ...quickSortObject(left, compareFn),
        [pivot]: obj[pivot],
        ...quickSortObject(right, compareFn)
    };
}

/**
 * Create a 2D array
 * @param {number} width - Width of array
 * @param {number} height - Height of array
 * @param {*} defaultValue - Default value for elements
 * @returns {Array[]} 2D array
 */
export function create2DArray(width, height, defaultValue = undefined) {
    const array = new Array(width);
    for (let i = 0; i < width; i++) {
        array[i] = new Array(height);
        if (defaultValue !== undefined) {
            array[i].fill(defaultValue);
        }
    }
    return array;
}
