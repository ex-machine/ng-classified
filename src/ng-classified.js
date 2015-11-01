'use strict';

var angular = require('angular');
var apply = require('apply-fn');

var ngClassified = angular.module('ngClassified', [])
.config(['$injector', function ($injector) {
	if ($injector.has('$classify')) {
		$injector.$classify = $injector.get('$classify');
	}
	$injector = injectorInjectInvokers($injector);
}])
.run(['$injector', function ($injector) {
	if ($injector.has('$classify')) {
		$injector.$classify = $injector.get('$classify');
	}
	$injector = injectorInjectInvokers($injector);
}]);

/**
 * Invoker injects invokee,
 * Injector invokes injectee,
 * Morrow instantiates.
 */

function injectorInjectInvokers(injector) {
	var invoke_ = injector.invoke;

	injector.instantiate = instantiate;
	injector.invoke = invoke;

	return injector;

	// pasted method that picks up patched 'invoke'
	function instantiate(Type, locals, serviceName) {
		var instance = Object.create((Array.isArray(Type) ? Type[Type.length - 1] : Type).prototype || null);
		var returnedValue = invoke(Type, instance, locals, serviceName);

		return (returnedValue !== null && typeof returnedValue === 'object') || (typeof returnedValue === 'function') ? returnedValue : instance;
	}

	function invoke() {
		var argsLength = arguments.length;
		var args = new Array(argsLength);
		for (var i = 0; i < argsLength; i++) {
			args[i] = arguments[i];
		}

		var nativeClassRegex = /^class/;
		var classRegex = /class/i;

		var invokeResult;
		var fn = args[0];
		var skipClassify = !angular.isFunction(fn) || fn.hasOwnProperty('$$classified');

		if (!skipClassify) {
			if (fn.$classify || nativeClassRegex.test(fn.toString())) {
				classifyInvokee(args);
			} else if (this.$classify || (this.$classify !== false && classRegex.test(fn.toString()))) {
				try {
					invokeResult = apply(injector, invoke_, args);
					fn.$$classified = false;
				} catch (e) {
					if (e instanceof TypeError && classRegex.test(e.message)) {
						classifyInvokee(args);
					} else {
						throw e;
					}
				}
			}	
		}

		return invokeResult || apply(injector, invoke_, args);
	}

	function classifyInvokee(args) {
		var fn_ = args[0]; 

		var fn = args[0] = function () {
			var fnArgsLength = arguments.length;
			var fnArgs = new Array(fnArgsLength);
			for (var i = 0; i < fnArgsLength; i++) {
				fnArgs[i] = arguments[i];
			}

			return new (Function.prototype.bind.apply(fn_, [null].concat(fnArgs)));
		};

		injector.annotate(fn_);
		fn.$inject = fn_.$inject;
		fn.$$classified = true;
	}
}

module.exports = ngClassified.name;