/**
 * LocalStorage and SessionStorage wrapper
 * @module storage/LocalStore
 */

/**
 * LocalStore class for persistent and session storage
 */
export class LocalStore {
    /**
     * Set a value in storage
     * @param {string} key - Key
     * @param {*} value - Value (will be JSON stringified)
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @returns {LocalStore} This instance for chaining
     */
    set(key, value, persistent = false) {
        const storage = persistent ? localStorage : sessionStorage;
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        storage.setItem(key, stringValue);
        return this;
    }

    /**
     * Get a value from storage
     * @param {string} key - Key
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @param {boolean} parse - Try to JSON parse the value
     * @returns {*} Value or null
     */
    get(key, persistent = false, parse = true) {
        const storage = persistent ? localStorage : sessionStorage;
        const value = storage.getItem(key);

        if (value === null) {
            return null;
        }

        if (parse) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }

        return value;
    }

    /**
     * Remove a value from storage
     * @param {string} key - Key
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @returns {LocalStore} This instance for chaining
     */
    remove(key, persistent = false) {
        const storage = persistent ? localStorage : sessionStorage;
        storage.removeItem(key);
        return this;
    }

    /**
     * Clear all values from storage
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @returns {LocalStore} This instance for chaining
     */
    clear(persistent = false) {
        const storage = persistent ? localStorage : sessionStorage;
        storage.clear();
        return this;
    }

    /**
     * Check if key exists
     * @param {string} key - Key
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @returns {boolean} True if exists
     */
    has(key, persistent = false) {
        const storage = persistent ? localStorage : sessionStorage;
        return storage.getItem(key) !== null;
    }

    /**
     * Get all keys
     * @param {boolean} persistent - Use localStorage (true) or sessionStorage (false)
     * @returns {string[]} Array of keys
     */
    keys(persistent = false) {
        const storage = persistent ? localStorage : sessionStorage;
        return Object.keys(storage);
    }
}

export const localStore = new LocalStore();
