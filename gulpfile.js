'use strict';
const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts         = require('gulp-typescript');
const uglify     = require('gulp-uglify');
const concat     = require('gulp-concat');
const sass       = require('gulp-sass');
const rimraf     = require('rimraf');
const typedoc    = require('gulp-typedoc');
const browserify = require('browserify');
const transform  = require('vinyl-transform');
const through2   = require('through2');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  rimraf('./dist', () => {});
  return rimraf('./docs', () => {});
});

// gulp.task('build:ts', () => {

//   return gulp.src('src/**/*.ts')
//     .pipe(sourcemaps.init())
//     .pipe(tsProject())
//     .js
//       // .pipe(concat('app.min.js'))
//       .pipe(through2.obj((file, enc, next) => {
//         browserify(file.path)
//           // .transform('stripify')
//           .bundle((err, res) => {
//             file.contents = res;
//             next(null, file);
//           });
//       }))
//       .pipe(uglify().on('error', () => {}))
//       .pipe(sourcemaps.write())
//       .pipe(gulp.dest('dist/'));
// });

gulp.task('build:ts', () => {
  
})

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

gulp.task('document', () => {
  return gulp.src(['src/app'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es5',
      includeDeclarations: true,

      // Output Options
      out: './docs',

      // TypeDoc Options
      name: "Chris Rabuse Portfolio",
      version: true
    }));
});

gulp.task('build', ['clean', 'document', 'build:ts', 'build:sass']);


gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['clean', 'build', 'watch']);