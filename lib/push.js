'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').execSync;
var escape = require('any-shell-escape');

module.exports = function (remote, branch, opt, cb) {

    if (!remote) remote = 'origin';
    if (!branch) branch = 'master';
    if (!cb && typeof opt === 'function') {
        cb = opt;
        opt = {};
    }
    if (!cb || typeof cb !== 'function') cb = function () {};
    if (!opt) opt = {};
    if (!opt.cwd) opt.cwd = process.cwd();
    if (!opt.args) opt.args = ' ';
    var exec = execAsync;
    if (opt.sync && opt.sync === true) exec = execSync;

    var cmd = 'git push ' + escape([remote, branch]) + ' ' + opt.args;
    return exec(cmd, {
        cwd: opt.cwd
    }, function (err, stdout, stderr) {
        if (err) cb(err);
        if (!opt.quiet) gutil.log(stdout, stderr);
        cb();
    });
};