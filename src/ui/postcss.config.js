module.exports = (ctx) => {
    const cssnano =
        ctx.env === 'production'
            ? {
                  preset: 'default',
              }
            : false;

    return {
        map: ctx.env !== 'production',
        plugins: {
            'postcss-import': {},
            'postcss-modules': {
                globalModulePaths: [/\/src\/components\/global-css/],
                localsConvention: 'dashesOnly',
            },
            'postcss-nesting': {},
            cssnano,
        },
    };
};
