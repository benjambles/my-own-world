import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*'],
    displayName: {
        color: 'blue',
        name: 'Lib',
    },
    extensionsToTreatAsEsm: ['.ts'],
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
