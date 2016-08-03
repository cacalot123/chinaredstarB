'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});
gulp.task('connect-web', function() {
    connect.server({
        root: '../',
        port: 2000,
        livereload: true
    });
});


gulp.task('web',['connect-web'], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});