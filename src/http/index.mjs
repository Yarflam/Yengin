/**
 * HTTP utilities module
 * @module http
 */

/**
 * Modern fetch wrapper with simplified API
 * @param {Object} options - Request options
 * @returns {Promise} Fetch promise
 */
export async function request(options) {
    const { url, method = 'GET', data = null, headers = {}, responseType = 'json' } = options;

    const fetchOptions = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    if (data && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
        if (typeof data === 'object') {
            fetchOptions.body = JSON.stringify(data);
        } else {
            fetchOptions.body = data;
        }
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    switch (responseType) {
        case 'json':
            return await response.json();
        case 'text':
            return await response.text();
        case 'blob':
            return await response.blob();
        case 'arrayBuffer':
            return await response.arrayBuffer();
        default:
            return response;
    }
}

/**
 * GET request
 * @param {string} url - URL
 * @param {Object} options - Additional options
 * @returns {Promise} Response
 */
export async function get(url, options = {}) {
    return request({ url, method: 'GET', ...options });
}

/**
 * POST request
 * @param {string} url - URL
 * @param {*} data - Data to send
 * @param {Object} options - Additional options
 * @returns {Promise} Response
 */
export async function post(url, data, options = {}) {
    return request({ url, method: 'POST', data, ...options });
}

/**
 * PUT request
 * @param {string} url - URL
 * @param {*} data - Data to send
 * @param {Object} options - Additional options
 * @returns {Promise} Response
 */
export async function put(url, data, options = {}) {
    return request({ url, method: 'PUT', data, ...options });
}

/**
 * DELETE request
 * @param {string} url - URL
 * @param {Object} options - Additional options
 * @returns {Promise} Response
 */
export async function del(url, options = {}) {
    return request({ url, method: 'DELETE', ...options });
}

/**
 * Load external JavaScript file
 * @param {string|string[]} urls - URL(s) to load
 * @param {boolean} waitAll - Wait for all scripts to load
 * @returns {Promise} Promise that resolves when loaded
 */
export function loadScript(urls, waitAll = false) {
    const urlArray = Array.isArray(urls) ? urls : [urls];

    const loadSingle = (url) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    if (waitAll) {
        return Promise.all(urlArray.map(loadSingle));
    } else {
        return Promise.allSettled(urlArray.map(loadSingle));
    }
}

/**
 * Load external CSS file
 * @param {string|string[]} urls - URL(s) to load
 * @param {boolean} waitAll - Wait for all stylesheets to load
 * @returns {Promise} Promise that resolves when loaded
 */
export function loadCSS(urls, waitAll = false) {
    const urlArray = Array.isArray(urls) ? urls : [urls];

    const loadSingle = (url) => {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    };

    if (waitAll) {
        return Promise.all(urlArray.map(loadSingle));
    } else {
        return Promise.allSettled(urlArray.map(loadSingle));
    }
}

/**
 * Load images
 * @param {string|string[]} urls - URL(s) to load
 * @returns {Promise<Image[]>} Promise with loaded images
 */
export function loadImages(urls) {
    const urlArray = Array.isArray(urls) ? urls : [urls];

    const loadSingle = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    };

    return Promise.all(urlArray.map(loadSingle));
}
