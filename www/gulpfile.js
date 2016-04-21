/**
 * Created by admin on 21.04.2016.
 */

var gulp = require("gulp");
var concat = require("gulp-concat");
var jsUglify = require("gulp-uglify");
var cssClean = require("gulp-clean-css");
var imageMin = require("gulp-imagemin");

gulp.task('js', function(){
    gulp.src('src/js/*.js')// or ['','',...]
        .pipe(concat('all.js'))
        .pipe(jsUglify({
            mangle: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function(){
    gulp.src('src/css/*.css')
        .pipe(cssClean())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function(){
    gulp.src('src/img/*.png')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['js', 'css', 'img'], function(){
    console.log("Default");
});

gulp.task('watch', function(){
    gulp.watch('src/*/*', ['default']);
});