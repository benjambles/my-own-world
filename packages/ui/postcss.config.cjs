const path = require('path');
const fs = require('fs');

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
            'postcss-import': {}, // Must be first plugin
            'postcss-modules': {
                getJSON: function (cssFileName, json) {
                    const jsonFileName = path.resolve(cssFileName + '.ts');
                    fs.writeFileSync(
                        jsonFileName,
                        `export default ${JSON.stringify(json)};`,
                    );
                },
                globalModulePaths: [/\/src\/components\/global-css/],
                localsConvention: 'dashesOnly',
            },
            cssnano,
        },
    };
};
