/*global AppConfig, AppDirective */
(function () {

'use strict';

let module = angular.mock.module;

let classRegex = /class/i;
let typeErrorRegex = /modulerr[\s\S]+?class/i;

describe('classified.minified', () => {
	beforeEach(module('appClassified'));

	it('should match class-related statements in class constructor', () => {
		expect(AppConfig.toString()).not.toMatch(classRegex);
	});

	it('should throw up on bootstrap', () => {
		expect(() => inject()).toThrow();
	});

	it('should rethrow class-related TypeError', () => {
		expect(() => inject()).toThrowError(Error, typeErrorRegex);
	});
});

})();