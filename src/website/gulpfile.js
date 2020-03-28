const { parallel, src, dest } = require('gulp');

const buildPath = '../../built/website';

function copyEnv() {
    return src('**/.env').pipe(dest(buildPath));
}

exports.copyEnv = copyEnv;
exports.default = parallel(copyEnv);
