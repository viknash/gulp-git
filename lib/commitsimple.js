'use strict';

var gutil = require('gulp-util');
var execAsync = require('child_process').exec;
var execSync = require('child_process').spawnSync;
var escape = require('any-shell-escape');
var path = require('path');

// want to get the current git hash instead?
// git.revParse({args:'--short HEAD'})

module.exports = function(message, opt, cb) {
	if (!opt) opt = {};
	if (!message || message.length === 0) {
	if (opt.args.indexOf('--amend') === -1) {
	  throw new Error('gulp-git: Commit message is required git.commit("commit message") or --amend arg must be given');
	}
	}
	if (!opt.cwd) opt.cwd = process.cwd();
	if (!opt.args) opt.args = ' ';

	var cmd = 'git commit ';
	if (message && opt.args.indexOf('--amend') === -1) {
	  cmd += '-m "' + message + '" ' + opt.args;

	} else {
	  // When amending, just add the file automatically and do not include the message not the file.
	  // Also, add all the files and avoid lauching the editor (even if --no-editor was added)
	  cmd += '-a ' + opt.args + (opt.args.indexOf('--no-edit') === -1 ? ' --no-edit' : '');
	}

    var child = execAsync(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
      if (!opt.quiet) gutil.log(stdout, stderr);
      if (err) return cb(err);
      else return cb(null);
    });
    
};
