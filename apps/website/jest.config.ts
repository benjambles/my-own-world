import { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*'],
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

export default config;
