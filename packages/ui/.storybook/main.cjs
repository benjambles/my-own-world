const { resolve } = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../src/components/**/*.stories.ts'],
    webpackFinal: async (config) => {
        config.experiments = {
            outputModule: true,
        };

        config.module.rules.push({
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            },
        });

        return config;
    },
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
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
    ],
};
