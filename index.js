'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Gulp Cozy module
 *
 * @module gulp-cozy
 * @author <Luciano Mammino> [lucianomammino@gmail.com]
 * @param {Gulp} gulp - an instance of Gulp
 * @param {String} cozyPath - The path where to look for Gulp tasks (defaults to "./gulp")
 * @returns {cozy}
 */
module.exports = function (gulp, cozyPath) {
	cozyPath = cozyPath || path.join(process.cwd(), 'gulp');

	/**
	 * Loads all tasks from the cozyPath. You can specify an object containing the configuration to pass
	 * to every task. Every subConfig object is mapped in the main object with the name of the task.
	 * @param {Object} options - An object that contains a map of the options to pass for every task factory function
	 * @throws {Error} if the cozyPath does not exist or is not a directory
	 */
	function cozy(options) {
		if (!fs.existsSync(cozyPath)) {
			throw new Error('Cozy path "' + cozyPath + '" does not exist');
		}

		if (!fs.lstatSync(cozyPath).isDirectory()) {
			throw new Error('Cozy path "' + cozyPath + '" is not a directory');
		}

		options = options || {};

		var files = fs.readdirSync(cozyPath);
		files.forEach(function (file) {
			var moduleName = file.substr(0, file.lastIndexOf('.'));
			if (!options[moduleName]) {
				options[moduleName] = {};
			}
		});
		Object.keys(options).forEach(function (taskName) {
			var taskOptions = options[taskName];
			cozy.require(taskOptions.moduleName || taskName, taskName, taskOptions);
		});
	}

	/**
	 * Require a specific task from the current cozyPath. If the task is not present in the cozyPath it will try to
	 * fall back to a regular module from the `node_modules` folder.
	 * @param {String} moduleName - the name of the module to require
	 * @param {String} taskName - the name of the task to register
	 * @param {Object} taskOptions - an optional configuration object to be passed to the task factory function
	 */
	cozy.require = function (moduleName, taskName, taskOptions) {
		var taskPath = path.join(cozyPath, moduleName);

		var task;
		try {
			task = require(taskPath);
		} catch (e) {
			if (e.code !== 'ENOENT') {
				throw e;
			}

			task = require(moduleName);
		}

		if (task instanceof Function) {
			task = task(gulp, taskOptions);
		}

		gulp.task(taskName, task);
	};

	return cozy;
};
