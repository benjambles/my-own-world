module.exports = {
    map: true,
    plugins: {
        'postcss-import': {},
        'postcss-modules': {
            globalModulePaths: [/\/src\/components\/global-css/],
            localsConvention: 'dashesOnly',
        },
    },
};
