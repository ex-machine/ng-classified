/*global AppConfig, AppDirective */
(function () {

'use strict';

let module = angular.mock.module;

let typeErrorRegex = /modulerr[\s\S]+?class/i;

describe('declassified.byConstant', () => {
	beforeEach(module(
		['$provide', ($provide) => {
			$provide.constant('$classify', false);
		}],
		'appClassified'
	));

	it('should throw up on bootstrap', () => {
		expect(() => inject()).toThrow();
	});

	it('should rethrow class-related TypeError', () => {
		expect(() => inject()).toThrowError(Error, typeErrorRegex);
	});
});

})();