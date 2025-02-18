import type { StorybookConfig } from '@storybook/web-components-webpack5';
import { dirname, join } from 'path';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

const config: StorybookConfig = {
    addons: [
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-links'),
    ],
    docs: {
        autodocs: true,
    },
    framework: {
        name: getAbsolutePath('@storybook/web-components-webpack5'),
        options: {},
    },
    staticDirs: [{ from: '../dist', to: '/mow-ui' }],
    stories: ['../src/**/*.stories.ts'],
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            plugins: [...(config.resolve?.plugins ?? []), new ResolveTypeScriptPlugin()],
        };

        // Return the altered config
        return config;
    },
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}
