# Yengin v3 - Modernization Plan

## Overview

Yengin v3 is a complete rebuild of the HTML5/Canvas JavaScript library, modernized for compatibility with modern JavaScript frameworks (React, Vue.js, Angular) while maintaining a clean API for vanilla JavaScript usage.

## Architecture

### Modular Structure

The library is organized into independent ES6 modules:

```
src/
├── index.mjs                 # Main entry point
├── Yengin.mjs               # Core class
├── utils/                   # Utility functions
│   ├── index.mjs
│   ├── type.mjs             # Type checking utilities
│   ├── object.mjs           # Object manipulation (deepCopy, etc.)
│   ├── string.mjs           # String utilities
│   ├── array.mjs            # Array utilities
│   └── format.mjs           # Formatting utilities
├── math/                    # Mathematical operations
│   ├── index.mjs
│   ├── vector.mjs           # 2D/3D vectors
│   ├── complex.mjs          # Complex numbers
│   ├── quaternion.mjs       # Quaternions
│   └── angles.mjs           # Angle conversions
├── color/                   # Color conversions
│   ├── index.mjs
│   ├── rgb.mjs              # RGB utilities
│   ├── hsl.mjs              # HSL conversions
│   ├── hsv.mjs              # HSV conversions
│   └── cmyk.mjs             # CMYK conversions
├── canvas/                  # Canvas utilities
│   ├── index.mjs
│   ├── Canvas.mjs           # Canvas wrapper class
│   ├── shapes.mjs           # Drawing shapes
│   └── text.mjs             # Text rendering
├── storage/                 # Storage utilities
│   ├── index.mjs
│   ├── Store.mjs            # In-memory store
│   ├── Stack.mjs            # Stack implementation
│   └── LocalStore.mjs       # LocalStorage wrapper
├── http/                    # HTTP utilities
│   ├── index.mjs
│   └── fetch.mjs            # Modern fetch wrapper
└── dom/                     # DOM utilities (optional for vanilla JS)
    ├── index.mjs
    └── helpers.mjs          # DOM helper functions
```

## Design Principles

### 1. Framework Agnostic Core

The core utilities (math, color, format, storage) are pure JavaScript functions with no DOM dependencies, making them safe to use in any framework.

### 2. Tree-Shakeable

Using ES6 modules allows bundlers to tree-shake unused code:

```javascript
// Import only what you need
import { deepCopy, isset } from 'yengin/utils';
import { Vector2D } from 'yengin/math';
```

### 3. Modern JavaScript

- ES6+ features (classes, arrow functions, destructuring)
- Promises instead of callbacks
- Async/await support
- Fetch API instead of XMLHttpRequest

### 4. TypeScript Support

TypeScript definition files (.d.ts) will be provided for better IDE support.

### 5. No External Dependencies

Keep the library dependency-free for minimal bundle size.

## Key Changes from v2.1.4

### What's Changed

1. **Module System**: IIFE → ES6 modules
2. **HTTP**: XMLHttpRequest → Fetch API
3. **Classes**: Function constructors → ES6 classes
4. **Syntax**: var → const/let, function() → arrow functions
5. **Indentation**: Tabs → 4 spaces

### What's Kept

1. **Core Utilities**: Type checking, object manipulation
2. **Math Libraries**: Vectors, complex numbers, quaternions
3. **Color Conversions**: RGB, HSL, HSV, CMYK
4. **Canvas Utilities**: Drawing helpers
5. **Storage**: LocalStorage wrappers, in-memory stores

### What's Optional

1. **DOM Manipulation**: Available as separate module, but frameworks handle this better
2. **jQuery-like API**: Not needed with modern frameworks

## Usage Examples

### With React

```javascript
import { Canvas } from 'yengin/canvas';
import { Vector2D } from 'yengin/math';
import { rgbToHsl } from 'yengin/color';

function MyComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new Canvas(canvasRef.current);
        canvas.drawCircle({ x: 50, y: 50, radius: 30, color: '#FF0000' });
    }, []);

    return <canvas ref={canvasRef} />;
}
```

### With Vue.js

```javascript
import { Vector2D } from 'yengin/math';
import { deepCopy } from 'yengin/utils';

export default {
    setup() {
        const position = ref(new Vector2D(0, 0));
        const clonedData = deepCopy(originalData);

        return { position, clonedData };
    }
}
```

### Vanilla JavaScript

```javascript
import Yengin from 'yengin';

const canvas = new Yengin.Canvas('#myCanvas');
canvas.drawRect({
    A: [0, 0],
    B: [100, 100],
    color: '#00FF00'
});
```

## Migration Guide (v2 → v3)

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

## Build System

We'll use a simple build process:
- ESLint for linting
- Prettier for formatting
- Rollup or esbuild for bundling (if needed)
- No complex build pipeline needed for ES modules

## Timeline

This is a living document that will be updated as development progresses.

**Status**: In Development
**Version**: 3.0.0-alpha
**Last Updated**: 2025-11-22
