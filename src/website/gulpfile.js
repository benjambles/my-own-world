const { parallel, src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const buildPath = '../../built/website';

function copyApiConfig() {
    return src('**/.env').pipe(dest(buildPath));
}

function copyEnv() {
    return src('**/*.json').pipe(dest(buildPath));
}

function buildWebsite() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(dest(buildPath));
}

exports.copyEnv = copyEnv;
exports.copyApiConfig = copyApiConfig;
exports.buildWebsite = buildWebsite;
exports.default = parallel(copyEnv, copyApiConfig, buildWebsite);
