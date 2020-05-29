module.exports = {
    roots: ['<rootDir>'],
    displayName: {
        name: 'SHARED SERVER',
        color: 'blue',
    },
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
