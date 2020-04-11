module.exports = {
    stories: ['../src/website/**/*.stories.ts'],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.ts$/,
            use: [
                {
                    loader: require.resolve('ts-loader'),
                },
            ],
        });
        config.resolve.extensions.push('.ts');
        return config;
    },
    addons: [
        '@storybook/addon-knobs/register',
        '@storybook/addon-notes/register-panel',
        '@storybook/addon-actions/register',
    ],
};
