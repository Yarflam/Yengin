/**
 * Vector mathematics
 * @module math/vector
 */

/**
 * 2D Vector class
 */
export class Vector2D {
    /**
     * Create a 2D vector
     * @param {number[]|number} a - Point A [x, y] or x coordinate
     * @param {number[]|number} b - Point B [x, y] or y coordinate
     */
    constructor(a, b = null) {
        if (Array.isArray(a) && Array.isArray(b)) {
            this.a = a;
            this.b = b;
        } else if (typeof a === 'number' && typeof b === 'number') {
            this.a = [0, 0];
            this.b = [a, b];
        } else {
            this.a = [0, 0];
            this.b = [0, 0];
        }
    }

    /**
     * Get vector length (magnitude)
     * @returns {number} Vector length
     */
    getLength() {
        const dx = this.b[0] - this.a[0];
        const dy = this.b[1] - this.a[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Get normalized vector (unit vector)
     * @returns {number[]} Normalized vector [x, y]
     */
    getNorm() {
        const length = this.getLength();
        if (length === 0) {
            return [0, 0];
        }
        return [(this.b[0] - this.a[0]) / length, (this.b[1] - this.a[1]) / length];
    }

    /**
     * Get angle in degrees
     * @returns {number} Angle in degrees
     */
    getAngle() {
        const [x, y] = this.getNorm();
        return toPolar(x, y);
    }

    /**
     * Add another vector
     * @param {Vector2D} v - Vector to add
     * @returns {Vector2D} New vector
     */
    add(v) {
        return new Vector2D(
            [this.a[0] + v.a[0], this.a[1] + v.a[1]],
            [this.b[0] + v.b[0], this.b[1] + v.b[1]]
        );
    }

    /**
     * Subtract another vector
     * @param {Vector2D} v - Vector to subtract
     * @returns {Vector2D} New vector
     */
    subtract(v) {
        return new Vector2D(
            [this.a[0] - v.a[0], this.a[1] - v.a[1]],
            [this.b[0] - v.b[0], this.b[1] - v.b[1]]
        );
    }

    /**
     * Multiply by scalar
     * @param {number} scalar - Scalar value
     * @returns {Vector2D} New vector
     */
    multiply(scalar) {
        const dx = (this.b[0] - this.a[0]) * scalar;
        const dy = (this.b[1] - this.a[1]) * scalar;
        return new Vector2D(this.a, [this.a[0] + dx, this.a[1] + dy]);
    }

    /**
     * Dot product with another vector
     * @param {Vector2D} v - Other vector
     * @returns {number} Dot product
     */
    dot(v) {
        const dx1 = this.b[0] - this.a[0];
        const dy1 = this.b[1] - this.a[1];
        const dx2 = v.b[0] - v.a[0];
        const dy2 = v.b[1] - v.a[1];
        return dx1 * dx2 + dy1 * dy2;
    }
}

/**
 * Convert angle to radians
 * @param {number} angle - Angle in degrees (0-360)
 * @returns {number} Angle in radians
 */
export function toRadian(angle) {
    return (angle - 180) / (180 / Math.PI);
}

/**
 * Convert radians to angle
 * @param {number} radian - Angle in radians
 * @returns {number} Angle in degrees (0-360)
 */
export function toAngle(radian) {
    return radian * (180 / Math.PI) + 180;
}

/**
 * Convert angle to Cartesian coordinates
 * @param {number} angle - Angle in degrees (0-360)
 * @returns {number[]} Cartesian coordinates [x, y]
 */
export function toCartesian(angle) {
    const rad = toRadian(angle);
    return [Math.cos(rad), Math.sin(rad)];
}

/**
 * Convert Cartesian coordinates to polar angle
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} Angle in degrees (0-360)
 */
export function toPolar(x, y) {
    const angleX = toAngle(Math.acos(x));
    const angleY = toAngle(Math.asin(y));
    return Math.floor(angleY) >= 180 ? angleX % 360 : 360 - angleX;
}
