var gulp = require('gulp'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  jasmine = require('gulp-jasmine'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename')
  notify = require('gulp-notify')

  gulp.task('jasmine-tests', function () {
    gulp.src('spec/**/*.js')
      .pipe(jasmine());
  });

  gulp.task('concat', function () {});

  gulp.task('client-scripts', function () {
    gulp.src('client/app/**/*.js')
      .pipe(jshint())
      .pipe(concat('client-main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
      .pipe(notify({message: 'Task: client-scripts complete!'}));
  });

  gulp.task('server-scripts', function () {
    gulp.src('server/**/*.js')
      .pipe(jshint())
      .pipe(concat('server-main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
      .pipe(notify({message: 'Task: server-scripts complete!'}));
  });

  gulp.task('default', ['client-scripts', 'server-scripts', 'jasmine-tests']);

  gulp.task('watch', function () {
    gulp.watch('client/app/**/*.js', ['client-scripts']);
    gulp.watch('server/**/*.js', ['server-scripts'])
  });

