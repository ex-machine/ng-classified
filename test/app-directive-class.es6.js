'use strict';

class AppDirective {
	constructor() {
		let depNames = this.constructor.$inject;

		Object.defineProperty(this, '$', {
			value: {}
		});
		
		depNames.forEach((depName, i) => {
			this.$[depName] = arguments[i]; 
		});
		
		this.restrict = 'E';
		this.template = '{{ appAnotherConstant }}';
		this.link = this.link.bind(this);
	}

	link(scope, element) {
		this.$.$rootScope.appAnotherConstant = this.$.appAnotherConstant;
	}
}

AppDirective.$inject = ['$rootScope', 'appAnotherConstant'];

module.exports = AppDirective;