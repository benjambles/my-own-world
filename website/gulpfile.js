const { parallel, src, dest, watch } = require('gulp');
const tsConfig = require('./tsconfig.json');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const buildPath = tsConfig.compilerOptions.outDir;

function copyEnv() {
    return src('src/.env').pipe(dest(buildPath));
}

function copyFonts() {
    return src('src/static/fonts/**/*.woff2').pipe(dest(buildPath + '/static/fonts'));
}

function postCSS() {
    const cssPath = buildPath + '/static/styles';
    console.log(cssPath);
    return src('src/static/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('precss'), require('autoprefixer')]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(cssPath));
}

function watchCSS() {
    // The task won't be run until 500ms have elapsed since the first change
    watch('src/static/styles/**/*.css', { delay: 500 }, function (cb) {
        postCSS();
        cb();
    });
}

exports.copyFonts = copyFonts;
exports.copyEnv = copyEnv;
exports.postCSS = postCSS;
exports.watchCSS = watchCSS;
exports.default = parallel(copyEnv, copyFonts, postCSS);
