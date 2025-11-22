/**
 * Stack data structure
 * @module storage/Stack
 */

const stacks = {};

/**
 * Stack class
 */
export class Stack {
    /**
     * Create or get a stack by name
     * @param {string} name - Stack name
     */
    constructor(name) {
        this.name = name;
        if (!stacks[name]) {
            stacks[name] = [];
        }
    }

    /**
     * Push a value onto the stack
     * @param {*} value - Value to push
     * @returns {number} New index
     */
    push(value) {
        stacks[this.name].push(value);
        return stacks[this.name].length - 1;
    }

    /**
     * Pop a value from the stack
     * @returns {*} Popped value or undefined
     */
    pop() {
        if (stacks[this.name].length > 0) {
            return stacks[this.name].pop();
        }
        return undefined;
    }

    /**
     * Peek at the top value without removing it
     * @returns {*} Top value or undefined
     */
    peek() {
        const length = stacks[this.name].length;
        return length > 0 ? stacks[this.name][length - 1] : undefined;
    }

    /**
     * Get value at specific index
     * @param {number} index - Index
     * @returns {*} Value or undefined
     */
    get(index) {
        return stacks[this.name][index];
    }

    /**
     * Clear the stack
     * @returns {Stack} This stack for chaining
     */
    clear() {
        stacks[this.name] = [];
        return this;
    }

    /**
     * Get stack size
     * @returns {number} Number of items
     */
    size() {
        return stacks[this.name].length;
    }

    /**
     * Check if stack is empty
     * @returns {boolean} True if empty
     */
    isEmpty() {
        return stacks[this.name].length === 0;
    }
}
