const { parallel, src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const serverBuildPath = '../../built/api';

function copyApiConfig() {
    return src('**/.env').pipe(dest(serverBuildPath));
}

function copyEnv() {
    return src('**/*.json').pipe(dest(serverBuildPath));
}

function buildServer() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(dest(serverBuildPath));
}

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.buildServer = buildServer;
exports.default = parallel(copyEnv, copyApiConfig, buildServer);
