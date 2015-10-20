/*global AppConfig, AppDirective */
(function () {

'use strict';

let dump = angular.mock.dump;
let inject = angular.mock.inject;
let module = angular.mock.module;

let classRegex = /class/i;

describe('classified', () => {
	beforeEach(module('appClassified'));

	it('should match class-related statements in class constructor', () => {
		expect(AppConfig.toString()).toMatch(classRegex);
	});

	it('should not throw up on bootstrap', () => {
		expect(() => inject()).not.toThrow();
	});	
});

describe('classified.config', () => {
	let appConstant, appAnotherConstant;

	beforeEach(module('appClassified'));
	
	beforeEach(inject(['appConstant', 'appAnotherConstant', (_appConstant_, _appAnotherConstant_) => {
		appConstant = _appConstant_;
		appAnotherConstant = _appAnotherConstant_;
	}]));

	it('should annotate AppConfig class', () => {
		expect(AppConfig.$inject).toEqual(['appConstant', 'appAnotherConstant']);
	});

	it('should execute config block with AppConfig dependencies', () => {
		expect(appConstant.value).toBe('bar');
	});
});

describe('classified.directive', () => {
	let $rootScope, $compile, appAnotherConstant, $injector;

	beforeEach(module('appClassified'));
	
	beforeEach(inject(['$rootScope', '$compile', 'appAnotherConstant', '$injector', (_$rootScope_, _$compile_, _appAnotherConstant_, _$injector_) => {
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		appAnotherConstant = _appAnotherConstant_;
		$injector = _$injector_;
	}]));

	it('should register a directive', () => {
		expect($injector.has('appDirectiveDirective')).toBe(true);
	});
	
	it('should compile a directive with AppDirective dependencies', () => {
		let scope = $rootScope;
		let element = angular.element('<app-directive>');

		$compile(element)(scope);
		scope.$digest();
		
		expect(scope.appAnotherConstant).toBe('bar');
		expect(element.text()).toBe('bar');
	});    
});

})();