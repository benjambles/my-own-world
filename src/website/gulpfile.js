const { src, dest } = require('gulp');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../dist/website');

const copyEnv = () => src('.env').pipe(dest(buildPath));

exports.copyEnv = copyEnv;
exports.default = copyEnv;
