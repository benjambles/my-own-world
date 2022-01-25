const ResolveTypeScriptPlugin = require('resolve-typescript-plugin').default;
const { resolve } = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    framework: '@storybook/web-components',
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
};
