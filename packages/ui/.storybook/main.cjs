module.exports = {
    core: {
        builder: 'webpack5',
    },
    framework: '@storybook/html',
    features: {
        storyStoreV7: true,
    },
    staticDirs: ['../lib/static'],
    stories: ['../src/components/**/*.stories.ts'],
    addons: [
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                    postcssOptions: {
                        config: '../postcss.config.cjs',
                    },
                },
            },
        },
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
    ],
};
