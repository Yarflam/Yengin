/**
 * Complex number mathematics
 * @module math/complex
 */

/**
 * Complex number class
 */
export class Complex {
    /**
     * Create a complex number
     * @param {number} real - Real part
     * @param {number} imaginary - Imaginary part
     */
    constructor(real = 0, imaginary = 0) {
        this.r = real;
        this.i = imaginary;
    }

    /**
     * Convert to string representation
     * @returns {string} String representation
     */
    toString() {
        if (this.r && this.i) {
            return `${this.r}${this.i >= 0 ? ' + ' : ' - '}${Math.abs(this.i)}i`;
        }
        if (this.r) {
            return `${this.r}`;
        }
        if (this.i) {
            return `${this.i}i`;
        }
        return '0';
    }

    /**
     * Add complex number
     * @param {Complex|number} other - Complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {Complex} Result
     */
    add(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        return new Complex(this.r + b.r, this.i + b.i);
    }

    /**
     * Subtract complex number
     * @param {Complex|number} other - Complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {Complex} Result
     */
    subtract(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        return new Complex(this.r - b.r, this.i - b.i);
    }

    /**
     * Multiply by complex number
     * @param {Complex|number} other - Complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {Complex} Result
     */
    multiply(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        return new Complex(this.r * b.r - this.i * b.i, this.r * b.i + this.i * b.r);
    }

    /**
     * Divide by complex number
     * @param {Complex|number} other - Complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {Complex} Result
     */
    divide(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        const denominator = b.r * b.r + b.i * b.i;
        return new Complex(
            (this.r * b.r + this.i * b.i) / denominator,
            (this.i * b.r - this.r * b.i) / denominator
        );
    }

    /**
     * Power operation
     * @param {Complex|number} exponent - Exponent (complex or real)
     * @returns {Complex} Result
     */
    power(exponent) {
        if (exponent instanceof Complex) {
            return new Complex(
                Math.pow(this.r, exponent.r) * Math.cos(exponent.i * Math.log(this.r)),
                Math.pow(this.r, exponent.r) * Math.sin(exponent.i * Math.log(this.r))
            );
        }

        if (!exponent || exponent === 1) {
            return new Complex(
                this.r / (!exponent ? this.r || 1 : 1),
                this.i / (!exponent ? this.i || 1 : 1)
            );
        }

        return new Complex(
            Math.pow(this.r, exponent) - Math.pow(this.i, exponent),
            this.r * Math.pow(this.i, exponent - 1) + this.i * Math.pow(this.r, exponent - 1)
        );
    }

    /**
     * Modulo operation
     * @param {Complex|number} other - Divisor
     * @returns {Complex} Result
     */
    modulo(other) {
        if (other instanceof Complex) {
            return new Complex(this.r % other.r, this.i % other.i);
        }
        return new Complex(this.r % other, this.i % other);
    }

    /**
     * Negate the complex number
     * @returns {Complex} Negated complex number
     */
    negate() {
        return new Complex(-this.r, -this.i);
    }

    /**
     * Get distance to another complex number
     * @param {Complex|number} other - Other complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {number} Distance
     */
    distance(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        return Math.sqrt(Math.pow(b.r - this.r, 2) + Math.pow(b.i - this.i, 2));
    }

    /**
     * Get normalized vector to another complex number
     * @param {Complex|number} other - Other complex number or real number
     * @param {number} otherI - Imaginary part (if other is real)
     * @returns {Complex} Normalized vector
     */
    getNorm(other, otherI = 0) {
        const b = other instanceof Complex ? other : new Complex(other, otherI);
        const dist = this.distance(b);
        return dist ? new Complex((this.r - b.r) / dist, (this.i - b.i) / dist) : new Complex();
    }

    /**
     * Get angle in degrees
     * @returns {number} Angle in degrees
     */
    getAngle() {
        const norm = this.getNorm();
        const rad = 180 / Math.PI;
        const x = Math.acos(norm.r) * rad + 180;
        const y = Math.asin(norm.i) * rad + 180;
        return Math.floor(y) < 180 ? x % 360 : 360 - x;
    }

    /**
     * Riemann zeta function approximation
     * @param {number} maxIterations - Maximum iterations
     * @returns {Complex} Result with log property
     */
    zeta(maxIterations) {
        let sum = new Complex();
        const one = new Complex(1);
        const log = [];

        for (let i = 0; i < maxIterations; i++) {
            log.push(sum);
            sum = sum.add(one.divide(new Complex(i + 1).power(this)));
        }

        sum.log = log;
        return sum;
    }
}
