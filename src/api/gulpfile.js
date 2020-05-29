const { parallel, src, dest } = require('gulp');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../dist/api');

const copyApiConfig = () => src('**/config.json').pipe(dest(buildPath));

const copyEnv = () => src('.env').pipe(dest(buildPath));

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.default = parallel(copyEnv, copyApiConfig);
