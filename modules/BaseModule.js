//const constants = require('../constants')

class BaseModule {
	constructor(triggered_at) {
		this.triggered_at = triggered_at
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
