/**
 * Tests for storage utilities
 */

import { Store } from '../../src/storage/Store.mjs';
import { Stack } from '../../src/storage/Stack.mjs';

describe('Storage Utilities', () => {
    describe('Store', () => {
        let store;

        beforeEach(() => {
            store = new Store('test-store');
            store.clear();
        });

        test('should set and get values', () => {
            store.set('key', 'value');
            expect(store.get('key')).toBe('value');
        });

        test('should check if key exists', () => {
            store.set('key', 'value');
            expect(store.has('key')).toBe(true);
            expect(store.has('nonexistent')).toBe(false);
        });

        test('should delete keys', () => {
            store.set('key', 'value');
            expect(store.delete('key')).toBe(true);
            expect(store.has('key')).toBe(false);
        });

        test('should return false when deleting nonexistent key', () => {
            expect(store.delete('nonexistent')).toBe(false);
        });

        test('should clear all values', () => {
            store.set('key1', 'value1');
            store.set('key2', 'value2');
            store.clear();
            expect(store.size()).toBe(0);
        });

        test('should get all keys', () => {
            store.set('a', 1);
            store.set('b', 2);
            expect(store.keys()).toEqual(['a', 'b']);
        });

        test('should get all values', () => {
            store.set('a', 1);
            store.set('b', 2);
            expect(store.values()).toEqual([1, 2]);
        });

        test('should return correct size', () => {
            expect(store.size()).toBe(0);
            store.set('a', 1);
            expect(store.size()).toBe(1);
            store.set('b', 2);
            expect(store.size()).toBe(2);
        });

        test('should support method chaining', () => {
            const result = store.set('a', 1).set('b', 2);
            expect(result).toBe(store);
        });
    });

    describe('Stack', () => {
        let stack;

        beforeEach(() => {
            stack = new Stack('test-stack');
            stack.clear();
        });

        test('should push and pop values', () => {
            stack.push(1);
            stack.push(2);
            expect(stack.pop()).toBe(2);
            expect(stack.pop()).toBe(1);
        });

        test('should return undefined when popping empty stack', () => {
            expect(stack.pop()).toBeUndefined();
        });

        test('should peek at top value', () => {
            stack.push(1);
            stack.push(2);
            expect(stack.peek()).toBe(2);
            expect(stack.size()).toBe(2); // Peek doesn't remove
        });

        test('should get value at index', () => {
            stack.push('a');
            stack.push('b');
            stack.push('c');
            expect(stack.get(0)).toBe('a');
            expect(stack.get(1)).toBe('b');
            expect(stack.get(2)).toBe('c');
        });

        test('should clear stack', () => {
            stack.push(1);
            stack.push(2);
            stack.clear();
            expect(stack.isEmpty()).toBe(true);
        });

        test('should return correct size', () => {
            expect(stack.size()).toBe(0);
            stack.push(1);
            expect(stack.size()).toBe(1);
        });

        test('should check if empty', () => {
            expect(stack.isEmpty()).toBe(true);
            stack.push(1);
            expect(stack.isEmpty()).toBe(false);
        });

        test('should return index on push', () => {
            const index = stack.push('value');
            expect(index).toBe(0);
        });
    });
});
