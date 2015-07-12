'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var browserify = require('browserify');
var source = require('vinyl-source-stream2');
var pkg = require('./package.json');

var customOpts = {
  entries: pkg.main,
  debug: true
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
    var b = browserify(customOpts).bundle();
    return b
	.pipe(source('ootalk.js'))
  .pipe(plugins.header(banner, {pkg: pkg}))
	.pipe(gulp.dest('./'))
	.pipe(plugins.uglify())
  .pipe(plugins.header(banner, {pkg: pkg}))
	.pipe(plugins.rename('ootalk.min.js'))
	.pipe(gulp.dest('./'));
}
