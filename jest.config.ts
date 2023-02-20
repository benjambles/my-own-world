import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    preset: 'ts-jest/presets/default-esm',
    moduleFileExtensions: ['ts', 'js'],
    projects: [
        '<rootDir>/apps/api',
        '<rootDir>/apps/website',
        '<rootDir>/packages/rise-engine',
        '<rootDir>/packages/shared-server',
        '<rootDir>/packages/ui',
    ],
    verbose: true,
};

export default config;
