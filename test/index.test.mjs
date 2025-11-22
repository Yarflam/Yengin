/**
 * Tests for main Yengin module
 */

import yengin, { Yengin } from '../src/index.mjs';

describe('Yengin Core', () => {
    test('should export default instance', () => {
        expect(yengin).toBeDefined();
        expect(yengin).toBeInstanceOf(Yengin);
    });

    test('should have version number', () => {
        expect(yengin.version).toBe('3.0.0');
        expect(yengin.getVersion()).toBe('3.0.0');
    });

    test('should have all module namespaces', () => {
        expect(yengin.utils).toBeDefined();
        expect(yengin.math).toBeDefined();
        expect(yengin.color).toBeDefined();
        expect(yengin.canvas).toBeDefined();
        expect(yengin.storage).toBeDefined();
        expect(yengin.http).toBeDefined();
    });

    test('should allow creating new instances', () => {
        const instance = new Yengin();
        expect(instance).toBeInstanceOf(Yengin);
        expect(instance.version).toBe('3.0.0');
    });
});
