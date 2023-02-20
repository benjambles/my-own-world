import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*'],
    displayName: {
        name: 'Lib',
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
};

export default config;
