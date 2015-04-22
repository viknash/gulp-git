'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').execSync;

module.exports = function (opt, cb) {
    if (!cb && typeof opt === 'function') {
        // optional options
        cb = opt;
        opt = {};
    }
    if (!cb || typeof cb !== 'function') cb = function () {};
    if (!opt) opt = {};
    if (!opt.cwd) opt.cwd = process.cwd();
    if (!opt.args) opt.args = ' ';
    var exec = execAsync;
    if (opt.sync && opt.sync === true) exec = execSync;

    var cmd = 'git status ' + opt.args;
    return exec(cmd, {
        cwd: opt.cwd
    }, function (err, stdout, stderr) {
        if (err) return cb(err, stderr);
        if (!opt.quiet) gutil.log(cmd + '\n' + stdout, stderr);
        if (cb) cb(err, stdout);
    });
};