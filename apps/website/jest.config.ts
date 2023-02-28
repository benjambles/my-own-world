import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*'],
    displayName: {
        color: 'blue',
        name: 'WEBSITE',
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '(.+)\\.js': '$1',
    },
    preset: 'ts-jest/presets/default-esm',
    testRegex: '/__tests__/.*\\.test\\.tsx?$',
    verbose: true,
};

export default config;
