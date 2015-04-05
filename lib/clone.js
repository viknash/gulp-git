'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').execSync;
var escape = require('any-shell-escape');

module.exports = function (remote, opt, cb) {
  if (!cb && typeof opt === 'function') {
    // optional options
    cb = opt;
    opt = {};
  }
  if (!cb || typeof cb !== 'function') cb = function () {};
  if (!opt) opt = {};
  if (!opt.cwd) opt.cwd = process.cwd();
  if (!opt.args) opt.args = ' ';
  var cmd = 'git clone ' + escape([remote]) + ' ' + opt.args;
  var exec = execAsync;
  if (opt.sync && opt.sync == true) exec = execSync;
  console.log("Hello");
  
  return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
    if (err) return cb(err);
    if (!opt.quiet) gutil.log(stdout, stderr);
    cb();
  });
};
