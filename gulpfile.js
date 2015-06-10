'use strict';

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    mocha = require('gulp-mocha');

gulp.task('build', ['test'], function() {
    return gulp.src('src/evt.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('test', function() {
   return gulp.src('tests/*.js', { read: false })
      .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['build']);
