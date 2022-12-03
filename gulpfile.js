'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', ()=> {
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
})

gulp.task('default', ['sass'])