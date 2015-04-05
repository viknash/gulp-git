'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').execSync;

module.exports = function (url, name, opt, cb) {
    if (!cb || typeof cb !== 'function') cb = function () {};
    if (!url) cb && cb(new Error('gulp-git: Repo URL is required git.submodule.add("https://github.com/user/repo.git", "repoName")'));
    if (!name) name = '';
    if (!opt) opt = {};
    if (!opt.cwd) opt.cwd = process.cwd();
    if (!opt.args) opt.args = '';
    var exec = execAsync;	
    if (opt.sync && opt.sync == true) exec = execSync;  
  
    var cmd = 'git submodule add ' + opt.args + ' ' + url + ' ' + name;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
      if (err && cb) cb(err);
      if (!opt.quiet) gutil.log(stdout, stderr);
      if (cb) cb();
    });
};
