/*eslint-env node, es6 */
'use strict';

let del = require('del');
let extend = require('extend');
let path = require('path');

let karmaServer = require('karma').Server;
let webpackConfig = require('./webpack.config.js');

let gulp = require('gulp');

gulp.$ = extend(require('gulp-load-plugins')(), {
	runSequence: require('run-sequence'),
	small: require('small').gulp,
	webpack: require('webpack-stream')
});



let packageName = 'ng-classified';

gulp.task('clean', (cb) => del(['./dist/*'], cb));

gulp.task('build', () => {
	return gulp.src(['src/**/*.js'])
	.pipe(gulp.$.small(packageName + '.js', {
		externalResolve: ['node_modules'],
		globalModules: {
			angular: {
				universal: 'angular'
			}
		},
		exportPackage: {
			universal: packageName 
		},
		outputFileName: {
			universal: packageName + '.js'
		}
	}))
	.pipe(gulp.$.debug())
	.pipe(gulp.dest('dist'));
});

gulp.task('minify', () => {
	return gulp.src(['dist/**.js'])
	.pipe(gulp.$.sourcemaps.init())
	.pipe(gulp.$.uglify({
		compress : {
			screw_ie8 : false
		}
	}))
	.pipe(gulp.$.rename({
		suffix: '.min'
	}))
	.pipe(gulp.$.sourcemaps.write('.'))
	.pipe(gulp.$.debug({ title: 'minify:' }))
	.pipe(gulp.dest('dist'));
});



gulp.task('test-clean', (cb) => del(['./test/dist/*'], cb));

gulp.task('test-build', function () {
	return gulp.$.webpack(webpackConfig)
	.pipe(gulp.$.debug({ title: 'test-build' }))
	.pipe(gulp.dest('test/dist'));
});

gulp.task('test-minify', (cb) => {
	return gulp.src(['test/dist/**/*minified.js'])
	.pipe(gulp.$.uglify({
		mangle : {
			except: ['appConstant', 'appAnotherConstant']
		}
	}))
	.pipe(gulp.dest('test/dist'));
});

gulp.task('test', (cb) => {
	gulp.$.runSequence(
		'test-clean',
		'test-build',
		'test-minify',
		'unit',
	cb);
});

gulp.task('test-babel', (cb) => {
	gulp.$.runSequence(
		'test-clean',
		'test-build',
		'test-minify',
		'unit:babel',
	cb);
});

gulp.task('unit', ['unit:babel', 'unit:native']);
gulp.task('unit:babel', ['unit:babel-maxified', 'unit:babel-minified']);

gulp.task('unit:babel-maxified', (cb) => {
	new karmaServer({
		configFile: path.resolve('karma.conf.js'),
		files: [
			'test/dist/**/test-*babel-maxified.js'
		]
	}, cb).start();
});

gulp.task('unit:babel-minified', (cb) => {
	new karmaServer({
		configFile: path.resolve('karma.conf.js'),
		files: [
			'test/dist/**/test-*babel-minified.js'
		]
	}, cb).start();
});

gulp.task('unit:native', (cb) => {
	new karmaServer({
		configFile: path.resolve('karma.conf.js'),
		files: [
			'test/dist/**/test-*native.js'
		]
	}, cb).start();
});



gulp.task('help', gulp.$.taskListing);

gulp.task('default', (cb) => {
	gulp.$.runSequence(
		'clean',
		'build',
		'minify',
		'test',
	cb);
});
