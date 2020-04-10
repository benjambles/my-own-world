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
};
