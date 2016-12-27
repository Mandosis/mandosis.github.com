'use strict';
const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts         = require('gulp-typescript');
const uglify     = require('gulp-uglify');
const concat     = require('gulp-concat');
const sass       = require('gulp-sass');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('build:ts', () => {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .js
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/'));
});

gulp.task('build:sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        outFile: 'app.min.css'
      })
        .on('error', sass.logError))
    .pipe(sourcemaps.write('dist/'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['build:ts', 'build:sass']);

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['build:ts']);
  gulp.watch('src/**/*.scss', ['build:sass']);
});

gulp.task('default', ['build', 'watch']);