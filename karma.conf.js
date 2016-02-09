/*eslint-env node, es6 */
'use strict';

module.exports = (karmaConfig) => {
	let config = {
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'test/dist/**/test-*babel-maxified.js'
		],
		exclude: [],
		reporters: ['spec'],
		port: 9876,
		captureTimeout: 20000,
		browserNoActivityTimeout: 30000,
		browserDisconnectTolerance: 1,
		colors: true,
		logLevel: karmaConfig.LOG_INFO,
		autoWatch: false,
		singleRun: true,
		concurrency: 1,
		browsers: ['Chrome'],
		customLaunchers: {
			Chrome_Travis_CI: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		}
	};

	if (process.env.TRAVIS) {
		config.browsers = ['Chrome_Travis_CI'];
	}

	karmaConfig.set(config)
}