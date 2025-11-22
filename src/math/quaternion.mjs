/**
 * Quaternion mathematics
 * @module math/quaternion
 */

/**
 * Quaternion class for 3D rotations
 */
export class Quaternion {
    /**
     * Create a quaternion
     * @param {number} w - W component (scalar)
     * @param {number} i - I component (x-axis)
     * @param {number} j - J component (y-axis)
     * @param {number} k - K component (z-axis)
     */
    constructor(w = 0, i = 0, j = 0, k = 0) {
        this.w = w;
        this.i = i;
        this.j = j;
        this.k = k;
    }

    /**
     * Convert to string representation
     * @returns {string} String representation
     */
    toString() {
        return `${this.w}${this.i >= 0 ? ' + ' : ' - '}${Math.abs(this.i)}i${
            this.j >= 0 ? ' + ' : ' - '
        }${Math.abs(this.j)}j${this.k >= 0 ? ' + ' : ' - '}${Math.abs(this.k)}k`;
    }

    /**
     * Add quaternion
     * @param {Quaternion|number} other - Quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {Quaternion} Result
     */
    add(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        return new Quaternion(this.w + q.w, this.i + q.i, this.j + q.j, this.k + q.k);
    }

    /**
     * Subtract quaternion
     * @param {Quaternion|number} other - Quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {Quaternion} Result
     */
    subtract(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        return new Quaternion(this.w - q.w, this.i - q.i, this.j - q.j, this.k - q.k);
    }

    /**
     * Multiply quaternion (Hamilton product)
     * @param {Quaternion|number} other - Quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {Quaternion} Result
     */
    multiply(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        return new Quaternion(
            this.w * q.w - this.i * q.i - this.j * q.j - this.k * q.k,
            this.i * q.w + this.w * q.i + this.k * q.j - this.j * q.k,
            this.j * q.w - this.k * q.i + this.w * q.j + this.i * q.k,
            this.k * q.w + this.j * q.i - this.i * q.j + this.w * q.k
        );
    }

    /**
     * Divide by quaternion
     * @param {Quaternion|number} other - Quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {Quaternion} Result
     */
    divide(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        const denominator = q.w * q.w + q.i * q.i + q.j * q.j + q.k * q.k;
        return new Quaternion(
            (this.w * q.w + this.i * q.i + this.j * q.j + this.k * q.k) / denominator,
            (this.i * q.w - this.w * q.i - this.k * q.j + this.j * q.k) / denominator,
            (this.j * q.w + this.k * q.i - this.w * q.j - this.i * q.k) / denominator,
            (this.k * q.w - this.j * q.i + this.i * q.j - this.w * q.k) / denominator
        );
    }

    /**
     * Power operation
     * @param {number} exponent - Exponent
     * @returns {Quaternion} Result
     */
    power(exponent) {
        if (!exponent || exponent === 1) {
            return new Quaternion(
                this.w / (!exponent ? this.w || 1 : 1),
                this.i / (!exponent ? this.i || 1 : 1),
                this.j / (!exponent ? this.j || 1 : 1),
                this.k / (!exponent ? this.k || 1 : 1)
            );
        }

        return new Quaternion(
            Math.pow(this.w, exponent - 1) -
                Math.pow(this.i, exponent - 1) -
                Math.pow(this.j, exponent - 1) -
                Math.pow(this.k, exponent - 1),
            this.i * Math.pow(this.w, exponent - 2) +
                this.w * Math.pow(this.i, exponent - 2) +
                this.k * Math.pow(this.j, exponent - 2) -
                this.j * Math.pow(this.k, exponent - 2),
            this.j * Math.pow(this.w, exponent - 2) -
                this.k * Math.pow(this.i, exponent - 2) +
                this.w * Math.pow(this.j, exponent - 2) +
                this.i * Math.pow(this.k, exponent - 2),
            this.k * Math.pow(this.w, exponent - 2) +
                this.j * Math.pow(this.i, exponent - 2) -
                this.i * Math.pow(this.j, exponent - 2) +
                this.w * Math.pow(this.k, exponent - 2)
        );
    }

    /**
     * Modulo operation
     * @param {Quaternion|number} other - Divisor
     * @returns {Quaternion} Result
     */
    modulo(other) {
        if (other instanceof Quaternion) {
            return new Quaternion(
                this.w % other.w,
                this.i % other.i,
                this.j % other.j,
                this.k % other.k
            );
        }
        return new Quaternion(this.w % other, this.i % other, this.j % other, this.k % other);
    }

    /**
     * Negate the quaternion
     * @returns {Quaternion} Negated quaternion
     */
    negate() {
        return new Quaternion(-this.w, -this.i, -this.j, -this.k);
    }

    /**
     * Get conjugate quaternion
     * @returns {Quaternion} Conjugate
     */
    conjugate() {
        return new Quaternion(this.w, -this.i, -this.j, -this.k);
    }

    /**
     * Get distance to another quaternion
     * @param {Quaternion|number} other - Other quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {number} Distance
     */
    distance(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        return Math.sqrt(
            Math.pow(q.w - this.w, 2) +
                Math.pow(q.i - this.i, 2) +
                Math.pow(q.j - this.j, 2) +
                Math.pow(q.k - this.k, 2)
        );
    }

    /**
     * Get normalized vector to another quaternion
     * @param {Quaternion|number} other - Other quaternion or scalar
     * @param {number} i - I component (if other is scalar)
     * @param {number} j - J component (if other is scalar)
     * @param {number} k - K component (if other is scalar)
     * @returns {Quaternion} Normalized vector
     */
    getNorm(other, i = 0, j = 0, k = 0) {
        const q = other instanceof Quaternion ? other : new Quaternion(other, i, j, k);
        const dist = this.distance(q);
        return dist
            ? new Quaternion(
                (this.w - q.w) / dist,
                (this.i - q.i) / dist,
                (this.j - q.j) / dist,
                (this.k - q.k) / dist
            )
            : new Quaternion();
    }

    /**
     * Get Euler angles (roll, pitch, yaw) in degrees
     * @returns {number[]} [roll, pitch, yaw] in degrees
     */
    getEulerAngles() {
        const rad = 180 / Math.PI;

        // Calculate components
        const aRoll = 2 * this.i * this.w - 2 * this.j * this.k;
        const bRoll = 1 - 2 * this.i * this.i - 2 * this.k * this.k;
        const aPitch = 2 * this.j * this.w - 2 * this.i * this.k;
        const bPitch = 1 - 2 * this.j * this.j - 2 * this.k * this.k;
        const aYaw = this.i * this.j + this.k * this.w;
        const bYaw = this.w * this.w + this.i * this.i + this.j * this.j + this.k * this.k;

        // Calculate Euler angles
        let roll = Math.atan2(aRoll, bRoll);
        let pitch = Math.atan2(aPitch, bPitch);
        let yaw = Math.asin((2 * aYaw) / (bYaw || 1));

        // Handle gimbal lock
        if (aYaw >= 0.5 || aYaw <= -0.5) {
            roll = 0;
            yaw = ((aYaw ? 1 : -1) * Math.PI) / 2;
            pitch = 2 * (aYaw ? 1 : -1) * Math.atan2(this.i, this.w);
        }

        return [(roll * rad + 180) % 360, (pitch * rad + 180) % 360, (yaw * rad + 180) % 360];
    }

    /**
     * Create quaternion from Euler angles
     * @param {number} roll - Roll in degrees (X-axis)
     * @param {number} pitch - Pitch in degrees (Y-axis)
     * @param {number} yaw - Yaw in degrees (Z-axis)
     * @returns {Quaternion} Quaternion
     */
    static fromEulerAngles(roll, pitch, yaw) {
        const rad = 180 / Math.PI;

        // Convert to radians
        roll = (roll - 180) / rad;
        pitch = (pitch - 180) / rad;
        yaw = (yaw - 180) / rad;

        // Calculate half angles
        const cRoll = Math.cos(roll / 2);
        const cPitch = Math.cos(pitch / 2);
        const cYaw = Math.cos(yaw / 2);
        const sRoll = Math.sin(roll / 2);
        const sPitch = Math.sin(pitch / 2);
        const sYaw = Math.sin(yaw / 2);

        return new Quaternion(
            cRoll * cPitch * cYaw - sRoll * sPitch * sYaw,
            cRoll * sPitch * sYaw + sRoll * cPitch * cYaw,
            cRoll * sPitch * cYaw + sRoll * cPitch * sYaw,
            cRoll * cPitch * sYaw - sRoll * sPitch * cYaw
        );
    }
}
