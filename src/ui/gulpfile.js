const { parallel, src, dest, watch } = require('gulp');
const postcss = require('gulp-postcss');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../dist/ui');

const copyFonts = () => src('static/fonts/**/*.woff2').pipe(dest(buildPath + '/static/fonts'));

const postCSS = () =>
    src('components/**/*.css')
        .pipe(postcss())
        .pipe(dest(buildPath + '/static/styles'));

const watchCSS = () => {
    // The task won't be run until 500ms have elapsed since the first change
    watch(['**/*.css', 'postcss.config.js'], { delay: 500 }, (cb) => {
        postCSS();
        cb();
    });
};

exports.copyFonts = copyFonts;
exports.postCSS = postCSS;
exports.watchCSS = watchCSS;
exports.default = parallel(copyFonts, postCSS);
