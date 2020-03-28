const { parallel, src, dest } = require('gulp');

const serverBuildPath = '../../built/api';

function copyApiConfig() {
    return src('**/config.json').pipe(dest(serverBuildPath));
}

function copyEnv() {
    return src('**/.env').pipe(dest(serverBuildPath));
}

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.default = parallel(copyEnv, copyApiConfig);
