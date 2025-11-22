# Yengin Test Suite

Comprehensive test suite for Yengin v3 using Jest.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- test/utils/type.test.mjs

# Run tests matching pattern
npm test -- --testNamePattern="Vector"
```

## Test Structure

```
test/
├── index.test.mjs              # Core module tests
├── utils/
│   ├── type.test.mjs          # Type checking tests
│   ├── object.test.mjs        # Object manipulation tests
│   └── string.test.mjs        # String utilities tests
├── math/
│   ├── vector.test.mjs        # Vector2D tests
│   ├── complex.test.mjs       # Complex numbers tests
│   └── quaternion.test.mjs    # Quaternion tests
├── color/
│   └── conversions.test.mjs   # Color conversion tests
├── canvas/
│   └── Canvas.test.mjs        # Canvas wrapper tests
├── storage/
│   └── storage.test.mjs       # Storage utilities tests
└── http/
    └── (http tests - requires mocking)
```

## Test Coverage

The test suite aims for >80% code coverage across all modules.

### Current Coverage Areas

- ✅ **Utils**: Type checking, object/string/array utilities, formatting
- ✅ **Math**: Vector2D, Complex, Quaternion operations
- ✅ **Color**: RGB/HSL/HSV/CMYK conversions and round-trips
- ✅ **Storage**: Store, Stack, LocalStore operations
- ✅ **Canvas**: Drawing operations, context management
- ⏳ **HTTP**: Fetch operations (requires network mocking)

## Writing New Tests

### Test File Template

```javascript
/**
 * Tests for [module name]
 */

import { functionName } from '../../src/module/file.mjs';

describe('Module Name', () => {
    describe('functionName', () => {
        test('should do something', () => {
            const result = functionName(input);
            expect(result).toBe(expected);
        });

        test('should handle edge cases', () => {
            expect(() => functionName(null)).toThrow();
        });
    });
});
```

### Best Practices

1. **Descriptive Test Names**: Use clear, descriptive test names
2. **Test Edge Cases**: Always test boundary conditions and error cases
3. **Isolation**: Each test should be independent
4. **Mock External Dependencies**: Use Jest mocks for DOM, network, etc.
5. **Coverage**: Aim for comprehensive coverage of all code paths

## Testing Guidelines

### Unit Tests

- Test individual functions in isolation
- Mock external dependencies
- Focus on input/output behavior
- Test edge cases and error conditions

### Integration Tests

- Test module interactions
- Verify correct behavior across multiple functions
- Test real-world usage scenarios

### Quality Standards

Tests should verify:
- ✅ Correct functionality
- ✅ Error handling
- ✅ Edge cases
- ✅ Type safety
- ✅ Performance (where applicable)

## Continuous Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example CI configuration
- name: Run tests
  run: npm test

- name: Check coverage
  run: npm run test:coverage
```

## Debugging Tests

```bash
# Run with verbose output
npm test -- --verbose

# Run specific test file
npm test -- test/utils/type.test.mjs

# Debug in Node
node --inspect-brk node_modules/.bin/jest --runInBand

# Update snapshots (if using)
npm test -- -u
```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory:

- `coverage/lcov-report/index.html` - HTML report
- `coverage/lcov.info` - LCOV format for CI tools
- `coverage/coverage-final.json` - JSON format

View HTML coverage report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Mocking

### Canvas API

Canvas tests use a mock implementation since Node doesn't have canvas support:

```javascript
const createMockCanvas = () => ({
    getContext: jest.fn(() => ({
        fillRect: jest.fn(),
        // ... other canvas methods
    }))
});
```

### Fetch API

HTTP tests should mock the fetch API:

```javascript
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'mock' })
    })
);
```

## Contributing

When adding new features:

1. Write tests first (TDD approach recommended)
2. Ensure tests pass: `npm test`
3. Check coverage: `npm run test:coverage`
4. Update test documentation if needed

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Testing Best Practices](https://testingjavascript.com/)
