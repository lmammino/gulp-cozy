'use strict';

var gulp = require('gulp');
var test = require('tape');
var path = require('path');
var cozy = require('../');

test('it should include assert module as a task', function (t) {
	t.plan(2);
	cozy(gulp, path.join(__dirname, 'gulp'));
	t.ok(gulp.hasTask('assert'), 'Gulp task has been added');
	t.ok(gulp.start('assert'), 'Gulp task has been executed correctly');
});
