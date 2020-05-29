const { resolve } = require('path');

module.exports = {
    stories: ['../components/**/*.stories.ts'],
    webpackFinal: async (config) => {
        config.module.rules = config.module.rules.map((f) => {
            // Needed to add this to ignore our ../src/ for the default rule, instead of purging it.
            if (f.test.toString() === '/\\.css$/') {
                f.exclude = resolve(__dirname, '../components/');
            }

            return f;
        });

        config.module.rules.push({
            test: /\.css$/,
            include: resolve(__dirname, '../components/'),
            loaders: ['style-loader', 'css-loader', 'postcss-loader'],
        });

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
        '@storybook/addon-a11y',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-docs',
    ],
};
