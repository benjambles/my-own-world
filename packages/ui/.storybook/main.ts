import { resolve } from 'path';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

const config = {
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {},
    },
    staticDirs: ['../dist/static'],
    stories: ['../src/components/**/*.stories.ts'],
    addons: [
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
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
    ],
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
