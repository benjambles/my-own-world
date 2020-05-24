const { parallel, src, dest, watch } = require('gulp');
const tsConfig = require('./tsconfig.json');
const postcss = require('gulp-postcss');
const buildPath = tsConfig.compilerOptions.outDir;

const copyEnv = () => src('src/.env').pipe(dest(buildPath));

const copyFonts = () =>
    src('src/static/fonts/**/*.woff2').pipe(dest(buildPath + '/static/fonts'));

const postCSS = () =>
    src('src/components/**/*.css')
        .pipe(postcss())
        .pipe(dest(buildPath + '/static/styles'));

const watchCSS = () => {
    // The task won't be run until 500ms have elapsed since the first change
    watch(['src/**/*.css', 'postcss.config.js'], { delay: 500 }, (cb) => {
        postCSS();
        cb();
    });
};

exports.copyFonts = copyFonts;
exports.copyEnv = copyEnv;
exports.postCSS = postCSS;
exports.watchCSS = watchCSS;
exports.default = parallel(copyEnv, copyFonts, postCSS);
