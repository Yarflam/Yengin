/**
 * Canvas wrapper class
 * @module canvas/Canvas
 */

/**
 * Canvas wrapper for easier drawing operations
 */
export class Canvas {
    /**
     * Create a Canvas wrapper
     * @param {HTMLCanvasElement|string} selector - Canvas element or selector
     */
    constructor(selector) {
        if (typeof selector === 'string') {
            this.element = document.querySelector(selector);
        } else {
            this.element = selector;
        }

        if (!this.element) {
            throw new Error('Canvas element not found');
        }

        this.ctx = this.element.getContext('2d');
        this.resizeHash = 0;
        this.scaleFactor = 1;
    }

    /**
     * Set canvas size
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     * @returns {Canvas} This canvas for chaining
     */
    setSize(width, height) {
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        return this;
    }

    /**
     * Set canvas DPP (dots per pixel) for high-DPI displays
     * @param {number|string} width - Width or 'auto'
     * @param {number|string} height - Height or 'auto'
     * @param {number} scale - Scale factor for DPI
     * @returns {Canvas} This canvas for chaining
     */
    setDPP(width, height, scale = 1) {
        this.scaleFactor = scale;
        const ratio = this.element.offsetHeight / this.element.offsetWidth;

        const w = width === 'auto' ? this.element.parentNode.offsetWidth : width;
        const h = height === 'auto' ? w * ratio : height;

        this.element.width = w * scale;
        this.element.height = h * scale;

        return this;
    }

    /**
     * Get current canvas dimensions
     * @returns {Object} {width, height}
     */
    getDimensions() {
        return {
            width: this.element.width,
            height: this.element.height
        };
    }

    /**
     * Setup auto-resize on window resize
     * @param {number} scale - Scale factor for DPI
     * @returns {Canvas} This canvas for chaining
     */
    autoResize(scale = 1) {
        this.setDPP('auto', 'auto', scale);

        const resizeHandler = () => {
            this.setDPP('auto', 'auto', scale);
            this.resizeHash = Date.now();
        };

        window.addEventListener('resize', resizeHandler);
        return this;
    }

    /**
     * Check if canvas was recently resized
     * @param {Function} callback - Callback to execute if resized
     * @param {number} threshold - Time threshold in ms
     */
    onResize(callback, threshold = 1000) {
        if (this.resizeHash >= Date.now() - threshold) {
            this.resizeHash = 0;
            callback(this.getDimensions());
        }
    }

    /**
     * Clear the entire canvas
     * @param {Object} area - Optional area {x, y, width, height}
     * @returns {Canvas} This canvas for chaining
     */
    clear(area = null) {
        if (area) {
            this.ctx.clearRect(area.x, area.y, area.width, area.height);
        } else {
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        }
        return this;
    }

    /**
     * Set drawing mode (source-over)
     * @returns {Canvas} This canvas for chaining
     */
    setDrawMode() {
        this.ctx.globalCompositeOperation = 'source-over';
        return this;
    }

    /**
     * Set clear mode (destination-out)
     * @returns {Canvas} This canvas for chaining
     */
    setClearMode() {
        this.ctx.globalCompositeOperation = 'destination-out';
        return this;
    }

    /**
     * Draw a circle
     * @param {Object} options - Circle options
     * @returns {Canvas} This canvas for chaining
     */
    drawCircle(options) {
        const {
            x,
            y,
            radius,
            color = '#000',
            border = 0,
            borderColor = '#000',
            shadow = 0,
            shadowColor = '#000',
            startAngle = 0,
            endAngle = 2 * Math.PI,
            fill = true
        } = options;

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = border;
        this.ctx.strokeStyle = borderColor;

        if (shadow) {
            this.ctx.shadowBlur = shadow;
        }
        if (shadowColor) {
            this.ctx.shadowColor = shadowColor;
        }

        this.ctx.arc(x, y, radius, startAngle, endAngle, false);

        if (fill) {
            this.ctx.fill();
        }
        if (border) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
        this.ctx.shadowBlur = 0;

        return this;
    }

    /**
     * Draw a rectangle
     * @param {Object} options - Rectangle options
     * @returns {Canvas} This canvas for chaining
     */
    drawRect(options) {
        const {
            x,
            y,
            width,
            height,
            color = '#000',
            border = 0,
            borderColor = '#000',
            fill = true
        } = options;

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = border;
        this.ctx.strokeStyle = borderColor;
        this.ctx.rect(x, y, width, height);

        if (fill) {
            this.ctx.fill();
        }
        if (border) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
        return this;
    }

    /**
     * Draw a rounded rectangle
     * @param {Object} options - Rectangle options
     * @returns {Canvas} This canvas for chaining
     */
    drawRoundRect(options) {
        const {
            x,
            y,
            width,
            height,
            radius = 0,
            color = '#000',
            border = 0,
            borderColor = '#000',
            fill = true
        } = options;

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = border;
        this.ctx.strokeStyle = borderColor;

        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);

        if (fill) {
            this.ctx.fill();
        }
        if (border) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
        return this;
    }

    /**
     * Draw a polygon
     * @param {Object} options - Polygon options
     * @returns {Canvas} This canvas for chaining
     */
    drawPolygon(options) {
        const {
            points = [],
            color = '#000',
            border = 0,
            borderColor = '#000',
            fill = true
        } = options;

        if (points.length < 2) {
            return this;
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = border;
        this.ctx.strokeStyle = borderColor;

        this.ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i][0], points[i][1]);
        }

        if (fill) {
            this.ctx.fill();
        }
        if (border) {
            this.ctx.stroke();
        }

        this.ctx.closePath();
        return this;
    }

    /**
     * Draw text
     * @param {Object} options - Text options
     * @returns {Canvas} This canvas for chaining
     */
    drawText(options) {
        const {
            x,
            y,
            text,
            font = '12pt Arial',
            color = '#000',
            align = 'left',
            baseline = 'alphabetic'
        } = options;

        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillText(text, x, y);

        return this;
    }

    /**
     * Draw a pixel
     * @param {Object} options - Pixel options
     * @returns {Canvas} This canvas for chaining
     */
    drawPixel(options) {
        const { x, y, color = '#000', size = 1 } = options;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);

        return this;
    }

    /**
     * Draw an image
     * @param {Object} options - Image options
     * @returns {Canvas} This canvas for chaining
     */
    drawImage(options) {
        const { source, sx = 0, sy = 0, sWidth, sHeight, dx, dy, dWidth, dHeight } = options;

        if (sWidth !== undefined) {
            this.ctx.drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        } else {
            this.ctx.drawImage(source, dx, dy, dWidth, dHeight);
        }

        return this;
    }

    /**
     * Export canvas to data URL
     * @param {string} type - Image type (default: 'image/png')
     * @returns {string} Data URL
     */
    toDataURL(type = 'image/png') {
        return this.element.toDataURL(type);
    }

    /**
     * Save current context state
     * @returns {Canvas} This canvas for chaining
     */
    save() {
        this.ctx.save();
        return this;
    }

    /**
     * Restore context state
     * @returns {Canvas} This canvas for chaining
     */
    restore() {
        this.ctx.restore();
        return this;
    }
}
