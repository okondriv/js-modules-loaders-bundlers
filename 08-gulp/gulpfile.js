'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: '*.html',
        js: 'src/js/main.js',
        style: 'src/styles/main.scss'
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.scss'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};


gulp.task('html:build', function () {
    gulp.src(path.src.html) // select files
        .pipe(rigger()) // run rigger to allow import 1 file into another
        .pipe(gulp.dest(path.build.html)) // output
        .pipe(reload({stream: true})); // reload server
});

gulp.task('lint', function() {
  return gulp.src('src/js/partials/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) // find main file
	    .pipe(rigger()) // run rigger
	    .pipe(sourcemaps.init()) // initialize sourcemap
	    .pipe(uglify()) // minify js
	    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString())})
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(path.build.js)) // output file
	    .pipe(reload({stream: true})); // reload server
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);


gulp.task('default', ['lint', 'build', 'webserver', 'watch']);
