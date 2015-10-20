'use strict';

class AppConfig {
	constructor(appConstant, appAnotherConstant) {
		appConstant.value = appAnotherConstant;
	}
}

module.exports = AppConfig;