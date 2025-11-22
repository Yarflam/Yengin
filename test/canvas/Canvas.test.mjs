/**
 * Tests for Canvas utilities
 * Note: These tests use JSDOM for canvas support
 */

import { Canvas } from '../../src/canvas/Canvas.mjs';

// Mock canvas element for testing
const createMockCanvas = () => {
    const canvas = {
        width: 800,
        height: 600,
        style: {},
        offsetWidth: 800,
        offsetHeight: 600,
        parentNode: {
            offsetWidth: 1000,
            offsetHeight: 750
        },
        getContext: jest.fn(() => ({
            fillStyle: '',
            strokeStyle: '',
            lineWidth: 0,
            shadowBlur: 0,
            shadowColor: '',
            font: '',
            textAlign: '',
            textBaseline: '',
            globalCompositeOperation: '',
            beginPath: jest.fn(),
            closePath: jest.fn(),
            arc: jest.fn(),
            rect: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            quadraticCurveTo: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
            fillText: jest.fn(),
            fillRect: jest.fn(),
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            save: jest.fn(),
            restore: jest.fn()
        })),
        toDataURL: jest.fn(() => 'data:image/png;base64,mock')
    };
    return canvas;
};

describe('Canvas', () => {
    let mockCanvas;
    let canvas;

    beforeEach(() => {
        mockCanvas = createMockCanvas();
        canvas = new Canvas(mockCanvas);
    });

    test('should create Canvas instance from element', () => {
        expect(canvas).toBeInstanceOf(Canvas);
        expect(canvas.element).toBe(mockCanvas);
        expect(canvas.ctx).toBeDefined();
    });

    test('should throw error if canvas not found', () => {
        expect(() => new Canvas(null)).toThrow('Canvas element not found');
    });

    test('should set size', () => {
        canvas.setSize(640, 480);
        expect(mockCanvas.style.width).toBe('640px');
        expect(mockCanvas.style.height).toBe('480px');
    });

    test('should set DPP', () => {
        canvas.setDPP(800, 600, 2);
        expect(mockCanvas.width).toBe(1600);
        expect(mockCanvas.height).toBe(1200);
        expect(canvas.scaleFactor).toBe(2);
    });

    test('should get dimensions', () => {
        const dims = canvas.getDimensions();
        expect(dims.width).toBe(800);
        expect(dims.height).toBe(600);
    });

    test('should clear canvas', () => {
        canvas.clear();
        expect(canvas.ctx.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });

    test('should clear specific area', () => {
        canvas.clear({ x: 10, y: 10, width: 100, height: 100 });
        expect(canvas.ctx.clearRect).toHaveBeenCalledWith(10, 10, 100, 100);
    });

    test('should set draw mode', () => {
        canvas.setDrawMode();
        expect(canvas.ctx.globalCompositeOperation).toBe('source-over');
    });

    test('should set clear mode', () => {
        canvas.setClearMode();
        expect(canvas.ctx.globalCompositeOperation).toBe('destination-out');
    });

    test('should draw circle', () => {
        canvas.drawCircle({
            x: 100,
            y: 100,
            radius: 50,
            color: '#FF0000'
        });

        expect(canvas.ctx.beginPath).toHaveBeenCalled();
        expect(canvas.ctx.arc).toHaveBeenCalledWith(
            100, 100, 50, 0, 2 * Math.PI, false
        );
        expect(canvas.ctx.closePath).toHaveBeenCalled();
    });

    test('should draw rectangle', () => {
        canvas.drawRect({
            x: 10,
            y: 10,
            width: 100,
            height: 50,
            color: '#00FF00'
        });

        expect(canvas.ctx.beginPath).toHaveBeenCalled();
        expect(canvas.ctx.rect).toHaveBeenCalledWith(10, 10, 100, 50);
        expect(canvas.ctx.closePath).toHaveBeenCalled();
    });

    test('should draw text', () => {
        canvas.drawText({
            x: 50,
            y: 50,
            text: 'Hello',
            font: '12pt Arial',
            color: '#000000'
        });

        expect(canvas.ctx.fillText).toHaveBeenCalledWith('Hello', 50, 50);
    });

    test('should draw pixel', () => {
        canvas.drawPixel({
            x: 10,
            y: 10,
            color: '#FF0000',
            size: 2
        });

        expect(canvas.ctx.fillRect).toHaveBeenCalledWith(10, 10, 2, 2);
    });

    test('should export to data URL', () => {
        const dataUrl = canvas.toDataURL();
        expect(dataUrl).toBe('data:image/png;base64,mock');
    });

    test('should support method chaining', () => {
        const result = canvas
            .clear()
            .setDrawMode()
            .drawCircle({ x: 100, y: 100, radius: 50 });

        expect(result).toBe(canvas);
    });

    test('should save and restore context', () => {
        canvas.save().restore();
        expect(canvas.ctx.save).toHaveBeenCalled();
        expect(canvas.ctx.restore).toHaveBeenCalled();
    });
});
