const { parallel, src, dest } = require('gulp');
const path = require('path');

const buildPath = path.resolve(__dirname, '../../dist/api');

const copyApiConfig = () => src(path.join(__dirname, '**/config.json')).pipe(dest(buildPath));

const copyEnv = () => src(path.join(__dirname, '.env')).pipe(dest(buildPath));

exports.default = parallel(copyEnv, copyApiConfig);
