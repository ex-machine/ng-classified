/*eslint-env node, es6 */
/*eslint comma-dangle: 0 */

'use strict';

let path = require('path');

let webpack = require('webpack');

module.exports = {
	cache: true,
	entry: {
		'test-bundle-babel-maxified': './test/bundle-babel-maxified.js',
		'test-bundle-babel-minified': './test/bundle-babel-minified.js',
		'test-bundle-native': './test/bundle-native.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve('test/dist'),
		pathinfo: true
	},
	resolve: {
		alias: {
			'angular-1.2': './bower_components/angular-1.2',
			'angular-1.3': './bower_components/angular-1.3',
			'angular-1.4': './bower_components/angular-1.4',
			'angular-mocks-1.2': './bower_components/angular-mocks-1.2',
			'angular-mocks-1.3': './bower_components/angular-mocks-1.3',
			'angular-mocks-1.4': './bower_components/angular-mocks-1.4',
		},
	},
	devtool: 'source-map',
	module: {
		loaders: [		
			{
				loader: 'babel',
				test: /\.es7\.js$/,
				exclude: /(node_modules|bower_components)/,
			}
		],
	},
	externals: {}
};