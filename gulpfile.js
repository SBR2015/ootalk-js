'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream2');
var pkg = require('./package.json');

var customOpts = {
  entries: pkg.main,
};

var banner = [
  '/*',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('script', bundle);
function bundle() {
    var b = browserify(customOpts)
    .require('./index.js', {expose: 'ootalk'})
    .bundle();
    return b
    .pipe(source('ootalk.js'))
    .pipe(plugins.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./'))
    .pipe(plugins.uglify())
    .pipe(plugins.header(banner, {pkg: pkg}))
    .pipe(plugins.rename('ootalk.min.js'))
    .pipe(gulp.dest('./'));
}

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(plugins.mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch(['./index.js', 'test/**'], ['mocha', 'script']);
});
