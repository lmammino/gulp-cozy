'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (gulp, folder) {
	folder = folder || path.join(process.cwd(), 'gulp');
	var files = fs.readdirSync(folder);
	files.forEach(function (file) {
		var task = require(path.join(folder, file));
		if (task instanceof Function) {
			task = task(gulp);
		}
		var taskName = file.substr(0, file.lastIndexOf('.'));
		gulp.task(taskName, task);
	});
};
