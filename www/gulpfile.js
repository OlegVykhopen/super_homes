(function(){

    'use strict';

    var gulp = require("gulp");
    var concat = require("gulp-concat");
    var jsUglify = require("gulp-uglify");
    var cssClean = require("gulp-clean-css");
    var imageMin = require("gulp-imagemin");
    var order = require("gulp-order");
    var htmlBuild = require("gulp-htmlbuild");
    var browserSync = require('browser-sync').create();
    var inject = require('gulp-inject');
    var sass = require('gulp-sass');


    /* Dev tasks  */

    var syncSrc = ['src/index.html', 'src/**/*.html', 'src/app/**/*.html' , 'src/js/*.js', 'src/js/**/*.js', 'src/app/**/*.js','src/css/*.css', 'src/css/**/*.css'],
        devHtmlSrc = ['src/js/*.js', 'src/js/**/*.js', "src/app/**/*.js", 'src/css/*.css', 'src/css/**/*.css'],
        jsSrc = ["src/js/**/*.js", "src/js/*.js", "src/app/**/*.js"],
        cssSrc = ['src/css/**/*.css', 'src/css/*.css'],
        sassSrc = ['src/sass/*.scss'],
        appHtmlSrc = ['src/app/**/*.html'],
        imgSrc = ['src/img/**/*', 'src/img/*'];

    var jsOrder = ["src/js/framework/angular.min.js", "src/js/framework/*.js", "src/app/**/module.js", "src/app/**/*.js",  "src/js/**/*.js", "src/js/*.js"],
        cssOrder = ['bootstrap.min.css', '/**/*.css', '*.css', 'style.css'];

    gulp.task('default', ['devHtml'], function(){

        browserSync.init({
            server: "src"
        });

        gulp.watch(sassSrc, ['sass']);
        gulp.watch(devHtmlSrc, ['devHtml']);
        gulp.watch(syncSrc).on('change', browserSync.reload);
    });

    gulp.task('devHtml', function(){
        gulp.src('src/index.html')
            .pipe(inject(
                gulp.src(jsSrc, {read: false})
                    .pipe(order(jsOrder, { base: "." })),
                {relative: true}))
            .pipe(inject(
                gulp.src(cssSrc, {read: false})
                    .pipe(order(cssOrder, { base: '.' })),
                {relative: true}))
            .on("error", handleError)
            .pipe(gulp.dest('./src'));
    });

    gulp.task('sass', function () {
        return gulp.src('src/sass/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
    });

    /* Build tasks */

    gulp.task('js', function(){
        gulp.src(jsSrc)
            .pipe(order(jsOrder, { base: "." }))
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(concat('all.min.js'))
            .pipe(jsUglify({
                hoist_funs: false
            }))
            .on("error", handleError)
            .pipe(gulp.dest('dist/js'));
    });

    gulp.task('css', function(){
        gulp.src(cssSrc)
            .pipe(order(cssOrder, { base: '.' }))
            .pipe(concat('main.css'))
            .pipe(cssClean())
            .on("error", handleError)
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('img', function(){
        gulp.src(imgSrc)
            .pipe(imageMin())
            .on("error", handleError)
            .pipe(gulp.dest('dist/img'));
    });

    gulp.task('html', function(){
        gulp.src('src/index.html')
            .pipe(htmlBuild({
                js: htmlBuild.preprocess.js(function(block){
                    block.write('js/all.min.js');
                    block.end();
                }),
                css: htmlBuild.preprocess.css(function(block){
                    block.write('css/main.css');
                    block.end();
                })
            }))
            .on("error", handleError)
            .pipe(gulp.dest('dist/'));

        gulp.src(appHtmlSrc)
            .pipe(gulp.dest('dist/app'));

    });

    gulp.task('build', ['js', 'css', 'img', 'html'], function(){
        console.log("build completed successfully");
    });

    function handleError(e){
        console.log(e);
    }

})();
