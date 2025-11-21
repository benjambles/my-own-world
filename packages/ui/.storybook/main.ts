// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/web-components-vite';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
    addons: [
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-links'),
    ],
    docs: {},
    framework: {
        name: getAbsolutePath('@storybook/web-components-vite'),
        options: {},
    },
    staticDirs: [{ from: '../dist', to: '/mow-ui' }],
    stories: ['../src/**/*.stories.ts'],
};

export default config;

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')));
}
