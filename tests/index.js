'use strict';

var gulp = require('gulp');
var test = require('tape');
var path = require('path');
var cozy = require('../')(gulp, path.join(__dirname, 'gulp'));

test('it should include assert module as a task', function (t) {
	t.plan(2);
	cozy();
	t.ok(gulp.hasTask('assert'), 'Gulp task has been added');
	t.ok(gulp.start('assert'), 'Gulp task has been executed correctly');
});

test('it should include assert module as a task indirectly', function (t) {
	t.plan(3);
	cozy({anotherAssert: {moduleName: 'assert'}});
	t.ok(gulp.hasTask('assert'), 'Gulp task has been added');
	t.ok(gulp.hasTask('anotherAssert'), 'Gulp task has been added');
	t.ok(gulp.start('anotherAssert'), 'Gulp task has been executed correctly');
});
