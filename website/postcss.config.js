module.exports = {
    map: false,
    plugins: {
        'postcss-import': {},
        'postcss-modules': {
            globalModulePaths: [/\/src\/components\/global-css/],
            localsConvention: 'dashesOnly',
        },
        cssnano: {
            preset: 'default',
        },
    },
};
