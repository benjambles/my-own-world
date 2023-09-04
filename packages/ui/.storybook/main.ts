import type { StorybookConfig } from '@storybook/web-components-webpack5';
import { resolve } from 'path';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

const config: StorybookConfig = {
    addons: [
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                    postcssOptions: {
                        config: resolve(__dirname, '../postcss.config.cjs'),
                    },
                },
            },
        },
    ],
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {},
    },
    staticDirs: [{ from: '../dist', to: '/mow-ui' }],
    stories: ['../src/**/*.stories.ts'],
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            plugins: [new ResolveTypeScriptPlugin()],
        };

        // Return the altered config
        return config;
    },
    docs: {
        autodocs: true,
    },
};

export default config;
