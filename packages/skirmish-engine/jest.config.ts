import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*'],
    displayName: {
        name: 'SKIRMISH ENGINE',
        color: 'blue',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    preset: 'ts-jest',
    resolver: 'jest-ts-webcompat-resolver',
    testEnvironment: 'node',
    testRegex: '/__tests__/.*\\.test\\.ts$',
    verbose: true,
};

export default config;