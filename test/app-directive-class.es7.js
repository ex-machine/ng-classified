'use strict';

export default
class AppDirective {
	static $inject = ['$rootScope', 'appAnotherConstant'];

	constructor(...deps) {
		let depNames = this.constructor.$inject;

		Object.defineProperty(this, '$', {
			value: {}
		});
		
		depNames.forEach((depName, i) => {
			this.$[depName] = deps[i]; 
		});
	}

	restrict = 'E';

	template = '{{ appAnotherConstant }}';
	
	link = (scope, element) => {
		this.$.$rootScope.appAnotherConstant = this.$.appAnotherConstant;
	}
}
