module.exports = {
    roots: ['<rootDir>'],
    displayName: {
        name: 'API',
        color: 'blue',
    },
    testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
