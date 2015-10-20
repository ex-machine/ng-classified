'use strict';

export default
class AppConfig {
	constructor(appConstant, appAnotherConstant) {
		appConstant.value = appAnotherConstant;
	}
}
