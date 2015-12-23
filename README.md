# gulp-cozy
Manage your gulp tasks in a cozier way.

[![npm version](https://badge.fury.io/js/gulp-cozy.svg)](https://badge.fury.io/js/gulp-cozy)
[![Build Status](https://travis-ci.org/lmammino/gulp-cozy.svg)](https://travis-ci.org/lmammino/gulp-cozy)


## Rationale
Ever found yourself digging into a gigantic monstrous `Gulpfile` with hundreds
of functions and tasks scattered all around? Well **I did** and I can tell you
it's not a great feeling...

This small module attempts to help with keeping yourself cozier (and happier!)
when working with Gulp. In a way it tries to bring a bit of the
*Node philosophy* (also known as "[The Node way](http://thenodeway.io/)") into
your Gulpfile.

*Gulp-cozy* in fact offers a very easy way to separate all your Gulp tasks into
small modules organized inside a dedicated folder. Gulp-cozy will take care to
load all the modules and to register them as Gulp tasks. With this approach you
will end up with several small modules that serve one specific purpose (a task),
which in turn result easier to maintain and to reason about.


## Installation

```bash
npm install --save-dev gulp-cozy
```


## Usage

Inside your Gulpfile:

```javascript
#Gulpfile.js

var gulp = require('gulp');
var cozy = require('gulp-cozy');
cozy(gulp);
```

Then you need to create a `gulp` folder inside the root of your project. You will
add all your tasks inside this folder. Every tasks is a file which name will
represent the name of the gulp task. For example we can add the `build-css` task
by creating the `build-css.js` file as follows:

```javascript
#gulp/build-css.js

var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

module.exports = function(gulp) {
  return function() {
    return gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.css'
    ])
      .pipe(concat('all.css'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('./assets/'))
    ;
  }
}
```

Notice that the module exports a function that receives the current instance of
Gulp as argument. This function is a factory for the real Gulp task logic so it
should return a function which, will be executed when calling the `build-css`
task with:

```bash
gulp build-css
```

You can also create a module to call a series tasks as in the following
example.

```javascript
#gulp/build.js

module.exports = ['clean', 'build-css', 'build-js', 'compress', 'upload'];
```

In this case the module needs to export just a plain array containing the names
of the tasks to be invoked when running:

```bash
gulp build
```


## Tests

```bash
npm test
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.
The project is currently using [XO](https://github.com/sindresorhus/xo) for
styleguide and style checks run with the regular test suite.

You can report issues or suggest improvements on
[Github](https://github.com/lmammino/gulp-cozy/issues).
