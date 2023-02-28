import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleFileExtensions: ['ts', 'js'],
    preset: 'ts-jest/presets/default-esm',
    projects: [
        '<rootDir>/apps/api',
        '<rootDir>/apps/website',
        '<rootDir>/packages/lib',
        '<rootDir>/packages/rise-engine',
        '<rootDir>/packages/shared-server',
        '<rootDir>/packages/skirmish-engine',
        '<rootDir>/packages/ui',
    ],
    verbose: true,
};

export default config;
