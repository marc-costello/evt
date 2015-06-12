'use strict';

var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('build', function() {
    gulp.src('src/evt.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['build']);
});

gulp.task('default', ['build']);
