'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').execSync;
var escape = require('any-shell-escape');

module.exports = function (branch, opt, cb) {
    if (!cb && typeof opt === 'function') {
        // optional options
        cb = opt;
        opt = {};
    }
    if (!cb || typeof cb !== 'function') cb = function () {};
    if (!opt) opt = {};
    if (!branch) return cb && cb(new Error('gulp-git: Branch name is require git.merge("name")'));
    if (!opt.cwd) opt.cwd = process.cwd();
    if (!opt.args) opt.args = ' ';
    var exec = execAsync;
    if (opt.sync && opt.sync === true) exec = execSync;

    var cmd = 'git merge ' + opt.args + ' ' + escape([branch]);
    return exec(cmd, {
        cwd: opt.cwd
    }, function (err, stdout, stderr) {
        if (err) return cb(err);
        if (!opt.quiet) gutil.log(stdout, stderr);
        cb();
    });
};