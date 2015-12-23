'use strict';

var assert = require('assert');

module.exports = function (gulp) {
	return function () {
		return assert(typeof gulp === 'object');
	};
};
