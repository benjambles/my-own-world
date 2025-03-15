import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*', '.d.ts'],
    displayName: {
        name: 'SHARED SERVER',
        color: 'blue',
    },
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            tsconfig: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                module: 'ESNext',
            },
        },
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleNameMapper: {
        '(.+)\\.js': '$1',
    },
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    testRegex: '/__tests__/.*\\.test\\.ts$',
    verbose: true,
};

export default config;
