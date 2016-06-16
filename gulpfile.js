var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  jasmine = require('gulp-jasmine'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  ngInject = require('gulp-ng-inject'),
  notify = require('gulp-notify')

  gulp.task('test', function () {
    gulp.src('spec/**/*.js')
      .pipe(jasmine())
      .pipe(notify({message: 'Finished testing!'}));
  });

  gulp.task('lint', function() {
    return gulp.src('client/app/**/*.js')
      .pipe(jshint())
      .pipe(notify({message: 'Linting complete!'}));
  });

  gulp.task('client-scripts', function () {

    var options = {
        name: "ng-inject", // The name of the module to use in your main Angular.js
        modules: ['ui.router'] // Any extra modules that you want to include.
    };

    return gulp.src(['client/app/**/*.js', 'client/app.js'])
      .pipe(jshint())
      .pipe(ngInject("client-main.js", options))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('client/dist'))
      .pipe(notify({message: 'Task: client-scripts complete!'}));
  });

  gulp.task('default', ['client-scripts', 'jasmine-tests']);

  gulp.task('watch', function () {
    gulp.watch('client/app/**/*.js', ['client-scripts']);
  });

