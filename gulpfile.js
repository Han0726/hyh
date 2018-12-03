/*
 * @Author:hanyinghua
 * @Date: 2018-12-03 09:10:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 09:59:30
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minjs = require('uglify');
var server = require('gulp-webserver');

var fs = require('fs');
var path = require('path');
var url = require('url');

//编译sass并压缩css
gulp.task('devScss', function() {
        gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(mincss())
            .pipe(gulp.dest('./src/css'));
    })
    //监听
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss'), gulp.series('devScss');
})
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end()
                }
                if (pathname === '/api/') {
                    res.end('124');
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))

})


gulp.task('dev', gulp.series('devScss', 'server', 'watch'));