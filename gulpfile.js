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
const fs = require('fs');

// NODE_ENV=production gulp [задача] - запустит задачу в production моде
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

if (isDevelopment) {
  console.log('**DEVELOPMENT**');
 } else {
  console.log('**PRODUCTION**');
 }

//объект с компонентами
 let components = getComponentsFiles();

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

  return gulp.src(components.js)
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(concat('scripts.min.js'))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('build/scripts/'));

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

gulp.task('build', gulp.series('clean', 'styles', 'html', 'javascript'));

gulp.task('watch', function() {
  gulp.watch('source/**/*.scss', gulp.series('styles'));
  gulp.watch('source/**/*.html', gulp.series('html'));
  gulp.watch('source/**/*.js', gulp.series('javascript'));
});

gulp.task('develop',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);

function getComponentsFiles() {

  let componentsFiles = {
    scss: [],
    js: [],
  }

  let connectManager = fs.readFileSync('source/styles/styles.scss', 'utf-8');

  let fileSystem = connectManager.split('\n').filter(function(item) {
    if(/^(\s*)@import '\.\.\/components/.test(item)) return true;
    return false;
  });

  fileSystem.forEach(function(item, i) {

    let componentData = /\/components\/(.+?)\/.+?.scss/.exec(item);

    //название компонента без расширения
    let componentName = componentData[1];
    //путь компонента
    let componentPath = 'source/components/' + componentName;
    //скрипт компонента
    let componentJs = componentPath + '/' + componentName + '.js';
    //если скрпит компонента существует, добавим в сборку
    if (isFileExist(componentJs)) {
      componentsFiles.js.push(componentJs)
    }

  });

  //добавим в начало массива компонентов глобальный файл js
  componentsFiles.js.unshift('source/scripts/scripts.js');

  return componentsFiles;

}

//проверка на существование файла
function isFileExist(path) {
  if (fs.statSync(path).size > 1) return true;
  return false;
}
