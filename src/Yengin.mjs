/**
 * Yengin - Modern JavaScript library for Canvas, Math, Colors, and utilities
 * @module Yengin
 * @version 3.0.0
 * @author Yarflam
 * @license ISC
 */

import * as utils from './utils/index.mjs';
import * as math from './math/index.mjs';
import * as color from './color/index.mjs';
import * as canvas from './canvas/index.mjs';
import * as storage from './storage/index.mjs';
import * as http from './http/index.mjs';

/**
 * Main Yengin class
 */
class Yengin {
    constructor() {
        this.version = '3.0.0';

        // Attach all modules
        this.utils = utils;
        this.math = math;
        this.color = color;
        this.canvas = canvas;
        this.storage = storage;
        this.http = http;
    }

    /**
     * Get version information
     * @returns {string} Version string
     */
    getVersion() {
        return this.version;
    }
}

// Create default instance
const yengin = new Yengin();

// Export default instance and class
export default yengin;
export { Yengin };

// Export all modules for tree-shaking
export { utils, math, color, canvas, storage, http };
