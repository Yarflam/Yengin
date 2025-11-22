# Contributing to Yengin

Thank you for your interest in contributing to Yengin! This document provides guidelines and information for contributors.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Yengin.git
   cd Yengin
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Code Style

- **Indentation**: 4 spaces (no tabs)
- **Language**: All code comments and documentation in English
- **Modules**: ES6 modules (.mjs extension)
- **Naming**: camelCase for functions/variables, PascalCase for classes

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting and Formatting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Pull Request Process

1. **Write Tests**: All new features must include tests
2. **Update Documentation**: Update README.md if adding new features
3. **Run Tests**: Ensure all tests pass (`npm test`)
4. **Run Linter**: Ensure code passes linting (`npm run lint`)
5. **Coverage**: Maintain or improve code coverage (>80%)
6. **Commit Messages**: Use clear, descriptive commit messages

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes (formatting)
- `chore`: Maintenance tasks

**Example:**
```
feat: Add Matrix3D class for 3D transformations

- Implement Matrix3D class with basic operations
- Add multiplication, inversion, and determinant methods
- Include comprehensive tests with edge cases

Closes #123
```

## Code Quality Standards

### Writing Tests

All new code must include tests:

```javascript
describe('MyNewFeature', () => {
    test('should handle basic case', () => {
        const result = myNewFunction(input);
        expect(result).toBe(expected);
    });

    test('should handle edge cases', () => {
        expect(() => myNewFunction(null)).toThrow();
    });
});
```

### Documentation

Include JSDoc comments for all public APIs:

```javascript
/**
 * Calculate the distance between two points
 * @param {number[]} pointA - First point [x, y]
 * @param {number[]} pointB - Second point [x, y]
 * @returns {number} Distance between points
 */
export function distance(pointA, pointB) {
    // Implementation
}
```

## Project Structure

```
src/
├── utils/      # Utility functions
├── math/       # Mathematical operations
├── color/      # Color conversions
├── canvas/     # Canvas utilities
├── storage/    # Storage utilities
└── http/       # HTTP utilities

test/           # Test files (mirrors src/ structure)
```

## CI/CD

All pull requests trigger automated checks:

- ✅ Tests on Node.js 14, 16, 18, 20
- ✅ Linting with ESLint
- ✅ Code formatting with Prettier
- ✅ Coverage threshold (>80%)

View CI results in the GitHub Actions tab.

## Adding New Features

1. **Plan**: Discuss major features in an issue first
2. **Design**: Consider framework compatibility (React, Vue, Angular)
3. **Implement**: Keep functions pure when possible
4. **Test**: Write comprehensive tests
5. **Document**: Update README and add JSDoc comments
6. **Review**: Submit PR and address feedback

## Module Guidelines

### Keep It Framework-Agnostic

```javascript
// ✅ Good: Pure function
export function add(a, b) {
    return a + b;
}

// ❌ Avoid: Browser-specific code in core modules
export function updateDOM(selector) {
    document.querySelector(selector).textContent = 'Updated';
}
```

### Tree-Shakeable Exports

```javascript
// ✅ Good: Named exports
export function functionA() { }
export function functionB() { }

// ❌ Avoid: Default export of object
export default {
    functionA,
    functionB
};
```

## Getting Help

- 📖 Read the [README.md](../README.md)
- 🧪 Check the [test/README.md](../test/README.md) for testing guidelines
- 💬 Open an issue for questions
- 📧 Contact maintainers for security issues

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

Thank you for making Yengin better! 🎉
