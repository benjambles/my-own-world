module.exports = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*', 'stories.*'],
    displayName: {
        name: 'WEBSITE',
        color: 'blue',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: 'ts-jest',
    resolver: 'jest-ts-webcompat-resolver',
    testRegex: '/__tests__/.*\\.test\\.tsx?$',
    verbose: true,
};
