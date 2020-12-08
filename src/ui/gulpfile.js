const { parallel, src, dest, watch } = require('gulp');
const postcss = require('gulp-postcss');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../dist/ui');

const copyFonts = () =>
    src(path.join(__dirname, 'static/fonts/**/*.woff2')).pipe(
        dest(path.resolve(buildPath, 'static/fonts')),
    );

const postCSS = () =>
    src(path.join(__dirname, 'components/**/*.css'))
        .pipe(postcss())
        .pipe(dest(path.resolve(buildPath, 'static/styles')));

const watchCSS = () => {
    // The task won't be run until 500ms have elapsed since the first change
    watch(
        [path.join(__dirname, '**/*.css'), path.join(__dirname, 'postcss.config.js')],
        { delay: 500 },
        (cb) => {
            postCSS();
            cb();
        },
    );
};

exports.watchCSS = watchCSS;
exports.default = parallel(copyFonts, postCSS);
