export default {
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.mjs'],
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.mjs$': '$1'
    },
    collectCoverageFrom: [
        'src/**/*.mjs',
        '!src/index.mjs'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    verbose: true
};
