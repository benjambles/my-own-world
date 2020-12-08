const { src, dest } = require('gulp');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../dist/website');

const copyEnv = () => src(path.resolve(__dirname, '.env')).pipe(dest(buildPath));

exports.default = copyEnv;
