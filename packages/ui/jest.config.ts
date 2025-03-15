import type { JestConfigWithTsJest } from 'ts-jest';
import { defaultsESM as tsjPreset } from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['fixture.*', 'stories.*', 'css.ts'],
    displayName: {
        color: 'blue',
        name: 'WEBSITE',
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '(.+)\\.js': '$1',
    },
    transform: {
        ...tsjPreset.transform,
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                module: 'ESNext',
            },
        ],
    },
    testRegex: '/__tests__/.*\\.test\\.tsx?$',
    verbose: true,
};

export default config;
