const { parallel, src, dest } = require('gulp');
const tsConfig = require('./tsconfig.json');

const buildPath = tsConfig.compilerOptions.outDir;

function copyEnv() {
    return src('**/.env').pipe(dest(buildPath));
}

exports.copyEnv = copyEnv;
exports.default = parallel(copyEnv);
