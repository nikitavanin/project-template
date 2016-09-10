'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// NODE_ENV=production gulp [задача] - запустит задачу в production моде
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {

  return gulp.src('source/styles/styles.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename('styles.min.css'))
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

gulp.task('javascript', function() {

  //собирать компоненты и подключать в нужном порядке
  return gulp.src(/*файлы*/)
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(concat('scripts.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('build/javascript/'));

});

gulp.task('clean', function() {
  return del(['build/*', '!build/README.md']);
});

gulp.task('serve', function() {

  browserSync.init({
    server: 'build',
    open: false
  });

  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'styles', 'html'));

gulp.task('watch', function() {
  gulp.watch('source/**/*.scss', gulp.series('styles'));
  gulp.watch('source/**/*.html', gulp.series('html'));
});

gulp.task('develop',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);
