import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*', '.d.ts'],
    displayName: {
        name: 'SHARED SERVER',
        color: 'blue',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    preset: 'ts-jest/presets/default-esm',
    moduleNameMapper: {
        '(.+)\\.js': '$1',
    },
    extensionsToTreatAsEsm: ['.ts'],
    testEnvironment: 'node',
    testRegex: '/__tests__/.*\\.test\\.ts$',
    verbose: true,
    globals: {
        __TS_CONFIG__: {
            module: 'esnext',
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
        },
    },
};

export default config;
