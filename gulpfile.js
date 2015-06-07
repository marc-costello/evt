var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('build', function() {
    gulp.src('src/evt.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);
