const apiTasks = require('./src/api/gulpfile');
const uiTasks = require('./src/ui/gulpfile');
const websiteTasks = require('./src/website/gulpfile');
const { parallel } = require('gulp');

exports.default = parallel(apiTasks.default, uiTasks.default, websiteTasks.default);
