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

        config.module.rules.push(
            {
                test: /\.css$/,
                include: resolve(__dirname, '../components/'),
                loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(js)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        );

        return config;
    },
    addons: ['@storybook/addon-a11y', '@storybook/addon-knobs', '@storybook/addon-essentials'],
};
