import type { StorybookConfig } from '@storybook/web-components-webpack5';
import { dirname, join } from 'path';

const config: StorybookConfig = {
    addons: [
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-essentials'),
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

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}
