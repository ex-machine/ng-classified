/*global AppConfig, AppDirective */
(function () {

'use strict';

let dump = angular.mock.dump;
let inject = angular.mock.inject;
let module = angular.mock.module;

let typeErrorRegex = /modulerr[\s\S]+?class/i;

describe('unclassified', () => {
	beforeEach(module('appUnclassified'));

	it('should throw up on bootstrap', () => {
		expect(() => inject()).toThrow();
	});

	it('should rethrow class-related TypeError', () => {
		expect(() => inject()).toThrowError(Error, typeErrorRegex);
	});
});

describe('reclassified.byConstant', () => {
	beforeEach(module(
		['$provide', ($provide) => {
			$provide.constant('$classify', true);
		}],
		'appClassified'
	));

	it('should not throw up on bootstrap', () => {
		expect(() => inject()).not.toThrow();
	});
});

describe('reclassified.byClassProperty', () => {
	beforeEach(
		() => {
			AppConfig.$classify = true;
			AppDirective.$classify = true;
		},
		module('appClassified')
	);

	it('should not throw up on bootstrap', () => {
		expect(() => inject()).not.toThrow();
	});

	afterEach(() => {
		delete AppConfig.$classify;
		delete AppDirective.$classify;
	});
});

})();
