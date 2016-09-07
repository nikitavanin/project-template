'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');

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
    .pipe(gulp.dest('build/styles/'));

});

gulp.task('html:index', function() {
  return gulp.src('source/templates/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('html:templates', function() {
  return gulp.src(['source/templates/*.html', '!source/templates/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(gulp.dest('build/templates/'))
});

gulp.task('html', gulp.series('html:index', 'html:templates'));

gulp.task('clean', function() {
  return del(['build/*', '!build/README.md']);
});

gulp.task('build', gulp.series('clean', 'styles'));

gulp.task('watch', function() {
  gulp.watch('source/styles/components/*/*.scss', gulp.series('styles'));
  //смотреть изменения html
});

gulp.task('develop', gulp.series('build', 'watch'));
