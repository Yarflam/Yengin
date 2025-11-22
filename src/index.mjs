/**
 * Yengin - Modern JavaScript library
 * Main entry point
 * @module yengin
 */

import yengin, { Yengin, utils, math, color, canvas, storage, http } from './Yengin.mjs';

// Export everything
export default yengin;
export { Yengin, utils, math, color, canvas, storage, http };

// Individual exports for convenience
export * from './utils/index.mjs';
export * from './math/index.mjs';
export * from './color/index.mjs';
export * from './canvas/index.mjs';
export * from './storage/index.mjs';
export * from './http/index.mjs';
