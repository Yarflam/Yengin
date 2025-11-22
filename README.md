# Yengin v3

[![CI](https://github.com/Yarflam/Yengin/workflows/CI/badge.svg)](https://github.com/Yarflam/Yengin/actions/workflows/ci.yml)
[![Coverage](https://github.com/Yarflam/Yengin/workflows/Coverage/badge.svg)](https://github.com/Yarflam/Yengin/actions/workflows/coverage.yml)
[![npm version](https://badge.fury.io/js/yengin.svg)](https://www.npmjs.com/package/yengin)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Modern JavaScript library for Canvas rendering, mathematical operations, color conversions, and utility functions. Built with ES6+ modules for seamless integration with React, Vue.js, Angular, and vanilla JavaScript.

## Features

- **Modular Architecture**: Import only what you need with ES6 modules
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- **Tree-Shakeable**: Optimized bundle size with modern build tools
- **TypeScript Ready**: Type definitions included (coming soon)
- **Zero Dependencies**: Lightweight and self-contained

## Modules

### Utils
Type checking, object manipulation, string utilities, array operations, and formatting functions.

### Math
- **Vector2D**: 2D vector mathematics with operations
- **Complex**: Complex number arithmetic
- **Quaternion**: Quaternion mathematics for 3D rotations

### Color
Color space conversions between:
- RGB ↔ Hexadecimal
- RGB ↔ HSL (Hue, Saturation, Lightness)
- RGB ↔ HSV (Hue, Saturation, Value)
- RGB ↔ CMYK (Cyan, Magenta, Yellow, Key)

### Canvas
Modern canvas wrapper with simplified drawing API:
- Shapes: circles, rectangles, rounded rectangles, polygons
- Text rendering
- Image drawing
- Auto-resize support
- High-DPI display support

### Storage
- **Store**: In-memory key-value store
- **Stack**: Stack data structure
- **LocalStore**: LocalStorage and SessionStorage wrapper

### HTTP
Modern fetch-based HTTP utilities:
- GET, POST, PUT, DELETE requests
- Load external scripts and stylesheets
- Image preloading

## Installation

```bash
npm install yengin
```

## Usage

### Import Entire Library

```javascript
import yengin from 'yengin';

console.log(yengin.getVersion()); // "3.0.0"
```

### Import Specific Modules (Recommended)

```javascript
// Import only what you need for optimal bundle size
import { Canvas } from 'yengin/canvas';
import { Vector2D } from 'yengin/math';
import { rgbToHex } from 'yengin/color';
import { deepCopy } from 'yengin/utils';
```

### Examples

#### Canvas with React

```javascript
import React, { useRef, useEffect } from 'react';
import { Canvas } from 'yengin/canvas';

function MyCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new Canvas(canvasRef.current);

        // Draw a circle
        canvas.drawCircle({
            x: 100,
            y: 100,
            radius: 50,
            color: '#FF6B6B',
            border: 2,
            borderColor: '#333'
        });

        // Draw a rounded rectangle
        canvas.drawRoundRect({
            x: 200,
            y: 50,
            width: 100,
            height: 100,
            radius: 10,
            color: '#4ECDC4'
        });
    }, []);

    return <canvas ref={canvasRef} width={800} height={600} />;
}
```

#### Vector Mathematics

```javascript
import { Vector2D, toCartesian } from 'yengin/math';

// Create a vector
const v1 = new Vector2D([0, 0], [10, 10]);
const v2 = new Vector2D([5, 5], [15, 15]);

// Vector operations
console.log(v1.getLength());     // Get magnitude
console.log(v1.getNorm());       // Get normalized vector
console.log(v1.add(v2));         // Add vectors
console.log(v1.dot(v2));         // Dot product

// Angle conversions
const coords = toCartesian(45);  // [0.707, 0.707]
```

#### Complex Numbers

```javascript
import { Complex } from 'yengin/math';

const c1 = new Complex(3, 4);    // 3 + 4i
const c2 = new Complex(1, 2);    // 1 + 2i

console.log(c1.add(c2));         // Add
console.log(c1.multiply(c2));    // Multiply
console.log(c1.toString());      // "3 + 4i"
```

#### Color Conversions

```javascript
import { rgbToHex, rgbToHsl, hslToRgb } from 'yengin/color';

// RGB to Hex
const hex = rgbToHex([255, 107, 107]); // "#FF6B6B"

// RGB to HSL
const hsl = rgbToHsl([255, 107, 107]); // [0, 1, 0.71]

// HSL to RGB
const rgb = hslToRgb([0.5, 0.5, 0.5]); // [64, 191, 191]
```

#### Storage

```javascript
import { Store, LocalStore } from 'yengin/storage';

// In-memory store
const store = new Store('myApp');
store.set('user', { name: 'John', age: 30 });
console.log(store.get('user'));

// LocalStorage wrapper
const localStorage = new LocalStore();
localStorage.set('settings', { theme: 'dark' }, true); // Persistent
localStorage.set('token', 'abc123', false);            // Session only
```

#### HTTP Requests

```javascript
import { get, post, loadScript } from 'yengin/http';

// Fetch data
const data = await get('https://api.example.com/users');

// Post data
const result = await post('https://api.example.com/users', {
    name: 'John',
    email: 'john@example.com'
});

// Load external script
await loadScript('https://cdn.example.com/library.js');
```

#### Utility Functions

```javascript
import { deepCopy, isset, formatStr, randInt } from 'yengin/utils';

// Deep copy objects
const original = { a: 1, b: { c: 2 } };
const copy = deepCopy(original);

// Type checking
console.log(isset(variable));

// String formatting
const str = formatStr('Hello {0}, you are {1} years old', ['John', 25]);
// "Hello John, you are 25 years old"

// Random integers
const random = randInt(1, 100); // Random number between 1-99
```

## Migration from v2.x

### Breaking Changes

1. **Module System**: Now uses ES6 modules instead of IIFE
2. **Imports**: Must import specific functions/classes
3. **No Global**: No longer attaches to window object automatically

### Before (v2.1.4)

```javascript
var yengin = require('yengin');
var copy = yengin.deepCopy(obj);
yengin.canvas('#myCanvas').drawCircle({...});
```

### After (v3.0.0)

```javascript
import { deepCopy } from 'yengin/utils';
import { Canvas } from 'yengin/canvas';

const copy = deepCopy(obj);
const canvas = new Canvas('#myCanvas');
canvas.drawCircle({...});
```

## Browser Support

- Modern browsers with ES6+ support
- Chrome/Edge 60+
- Firefox 60+
- Safari 12+

For older browsers, use a transpiler like Babel.

## Development

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Format code
npm run format
```

## License

ISC License - see LICENSE file for details

## Author

Yarflam - [https://github.com/Yarflam](https://github.com/Yarflam)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
