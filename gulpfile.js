'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {

  if (isDevelopment) {
    console.log('**DEVELOPMENT**')
  } else {
    console.log('**PRODUCTION**');
  }

  return gulp.src('source/styles/styles.scss', {base: 'source'})
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('build'));

});

gulp.task('clean', function() {
  return del(['build/*', '!build/README.md']);
});

gulp.task('build', gulp.series('clean', 'styles'));

gulp.task('watch', function() {
  gulp.watch('source/**/*.scss', gulp.series('styles'));
});

gulp.task('dev', gulp.series('build', 'watch'));
