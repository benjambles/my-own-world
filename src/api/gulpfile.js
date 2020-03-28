const { parallel, src, dest } = require('gulp');
const tsConfig = require('./tsconfig.json');

const buildPath = tsConfig.compilerOptions.outDir;

function copyApiConfig() {
    return src('**/config.json').pipe(dest(buildPath));
}

function copyEnv() {
    return src('**/.env').pipe(dest(buildPath));
}

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.default = parallel(copyEnv, copyApiConfig);
