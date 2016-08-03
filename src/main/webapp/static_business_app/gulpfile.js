'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});
gulp.task('connect-web', function() {
    connect.server({
        root: '../',
        port: 2001,
        livereload: true
    });
});


gulp.task('sass:watch',[], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('web',['connect-web'], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});