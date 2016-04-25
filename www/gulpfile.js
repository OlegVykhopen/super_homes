var gulp = require("gulp");
var concat = require("gulp-concat");
var jsUglify = require("gulp-uglify");
var cssClean = require("gulp-clean-css");
var imageMin = require("gulp-imagemin");
var order = require("gulp-order");
var htmlBuild = require("gulp-htmlbuild");
var browserSync = require('browser-sync').create();

/* Dev tasks  */

gulp.task('default', ['devHtml'], function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['src/index.html', 'src/*/*.html']).on('change', browserSync.reload);
});

gulp.task('devHtml', function(){

});


/* Build tasks */

gulp.task('js', function(){
    gulp.src(["src/js/*/*.js", "src/js/*.js"])
        .pipe(order([
            "src/js/framework/*.js",
            "src/js/*/*.js",
            "src/js/*.js"
        ], { base: "." }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(concat('all.min.js'))
        .pipe(jsUglify({
            hoist_funs: false
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function(){
    gulp.src('src/css/*.css')
        .pipe(order([
            'bootstrap.min.css',
            '*.css',
            'style.css'
        ], { base: '.' }))
        .pipe(concat('main.css'))
        .pipe(cssClean())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function(){
    gulp.src(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'])
        .pipe(imageMin())
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
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js', 'css', 'img', 'html'], function(){
    console.log("build completed successfully");
});