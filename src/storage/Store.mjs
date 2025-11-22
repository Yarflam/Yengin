/**
 * In-memory key-value store
 * @module storage/Store
 */

const stores = {};

/**
 * In-memory store class
 */
export class Store {
    /**
     * Create or get a store by name
     * @param {string} name - Store name
     */
    constructor(name) {
        this.name = name;
        if (!stores[name]) {
            stores[name] = {};
        }
    }

    /**
     * Set a value
     * @param {string} key - Key
     * @param {*} value - Value
     * @returns {Store} This store for chaining
     */
    set(key, value) {
        stores[this.name][key] = value;
        return this;
    }

    /**
     * Get a value
     * @param {string} key - Key
     * @returns {*} Value or undefined
     */
    get(key) {
        return stores[this.name][key];
    }

    /**
     * Check if key exists
     * @param {string} key - Key
     * @returns {boolean} True if exists
     */
    has(key) {
        return key in stores[this.name];
    }

    /**
     * Delete a key
     * @param {string} key - Key
     * @returns {boolean} True if deleted
     */
    delete(key) {
        if (this.has(key)) {
            delete stores[this.name][key];
            return true;
        }
        return false;
    }

    /**
     * Clear all values
     * @returns {Store} This store for chaining
     */
    clear() {
        stores[this.name] = {};
        return this;
    }

    /**
     * Get all keys
     * @returns {string[]} Array of keys
     */
    keys() {
        return Object.keys(stores[this.name]);
    }

    /**
     * Get all values
     * @returns {Array} Array of values
     */
    values() {
        return Object.values(stores[this.name]);
    }

    /**
     * Get number of items
     * @returns {number} Number of items
     */
    size() {
        return this.keys().length;
    }
}
