//const constants = require('../constants')

class BaseModule {
	constructor(config) {
		this.config = config
	}

	canProcess() {
		// TO OVERRIDE WITH Client EVENT PARAMETERS
		return true
	}

	process() {
		//TO OVERRIDE WITH Client EVENT PARAMETERS
	}
};

module.exports = BaseModule;
