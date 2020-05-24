const { parallel, src, dest } = require('gulp');
const tsConfig = require('./tsconfig.json');

const buildPath = tsConfig.compilerOptions.outDir;

const copyApiConfig = () => src('src/**/config.json').pipe(dest(buildPath));

const copyEnv = () => src('src/.env').pipe(dest(buildPath));

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.default = parallel(copyEnv, copyApiConfig);
