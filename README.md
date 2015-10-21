# ng-classified

Compels AngularJS to be friendly to ES6/ES2015 classes. It will be sweet to these fellows from now on.

[![Build Status](https://travis-ci.org/ex-machine/ng-classified.svg?branch=master)](https://travis-ci.org/ex-machine/ng-classified)

## Description

Wouldn't it be great to benefit from OOP application design and do something like this?

```javascript
app.directive('appDirective', AppDirectiveClass);
```

Yes. And... no. This will cause the exception to be thrown right in developer's face. Depending on ES6 implementation, it may be

> TypeError: Cannot call a class as a function

for Babel transpiler, or similar killjoy for Traceur and any JavaScript engine with native ES6 class support. That's right, class constructors should be `new`ed. They cannot be called directly, but that's what `$injector.invoke` is trying to do. Bad injector, stupid invoke.

Naturally, the code above will end up as

```javascript
app.directive('appDirective', (() => {
		let fn = (...deps) => new AppDirectiveClass(...deps);
		fn.$inject = AppDirectiveClass.$inject;
		return fn;
	})()
);
```

Wouldn't it be great to pollute the application with WET boilerplate wrapper hacks? Yes? Or... no?

This extension patches Angular `$injector` service in polite but urgent manner to give ES6 classes the treatment they deserve.

## Install

### NPM

    npm install --save ng-classified

### Bower

    bower install --save ng-classified

## Classified documentation

 Relying on several conditions, `$injector.invoke` (which stands behind all DI in Angular) detects if the supplied function is a class constructor and should be called with `new`, not directly. Wraps the call to invoked function with `try…catch`, if necessary. It does all magic when Angular components are defined.


### Annotation

As with functions, `$inject` static property is used to annotate class constructor.

`static $inject = […]` (ES7). Or `ClassName.$inject = […]` (ES6).

The dependencies will be annotated automatically in unminified code. Array annotations are not supported intentionally. 

### `$classify` property

`$classify` static property should be defined on classes in order for the injector to detect them unambiguously.

`static $classify = true` (ES7). Or `ClassName.$classify = true` (ES6).


Native (non-transpiled) Chrome/V8 classes can be certainly detected and don't need this property. 

### `$classify` service

Initially defines the behaviour of `ngClassified` module within application. It is not defined by default (assumed to be `undefined`) and supposed to be `constant` service to be ready-to-serve at configuration phase.

```javascript
app.constant('$classify', true);
```

Possible values are:
- `undefined` (default). Provides heuristic approach to class detection (tries-catches only the functions which are believed to be class constructors). *Suitable for production and unminified code.*
- `false`. Detects native Chrome/V8 classes, relies on `$classify` property otherwise. *Suitable for production and minified code.*
- `true`. Tries-catches everything, provides considerable performance penalty. *Suitable for development and minified code.*

### Clearance

TS. No pun intended.

## Usage

The usage for average ES6/ES7 project is

```javascript
import { ngClassified } from 'ng-classified';
import { JoeConfig } from 'joe-config';
import { JoeController } from 'joe-controller';
import { JoeDirective } from 'joe-directive';

angular.module('average', [ngClassified])
.constant('$classify', false)
.config(JoeConfig)
.controller('JoeController', JoeController)
.directive('joeDirective', JoeDirective);

```

```javascript
export class JoeConfig {
	static $classify = true;

	constructor(averageUnannotatedProvider) {
		…
	}
}
```

```javascript
export class JoeController {
	static $classify = true;

	scopeProperty = { … };  
}
```

```javascript
export class JoeDirective {
	static $classify = true;
	static $inject = ['dependency'];

	constructor(...deps) {
		let depNames = this.constructor.$inject;

		Object.defineProperty(this, '$', {
			value: {}
		});

		depNames.forEach((depName, i) => {
			this.$[depName] = deps[i]; 
		});
	}

	scope = {};

	controller = 'JoeController';

	controllerAs = 'Joe';

	link = () => {
		this.$.dependency…;
	}
}
```

See also [specs](https://github.com/ex-machine/ng-classified/tree/master/test) for more details on the use.

## Compatibility

The extension itself doesn't use specific ES6 features. ES5 `Function.prototype.bind` is being used, it has to be be shimmed in PhantomJS and legacy browsers.