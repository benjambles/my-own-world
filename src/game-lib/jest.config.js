module.exports = {
    roots: ['<rootDir>'],
    displayName: {
        name: 'GAME LIB',
        color: 'blue',
    },
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
