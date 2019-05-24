const BaseModule = require("./BaseModule.js")
const Utils = require('../Utils.js')

class DMMshllhSender extends BaseModule {
    canProcess(message) {
    	return Utils.rand() < 25 && message.content.includes("😢")
    }
    process(message) {
        message.channel.send("RT si t trist");
    }
}

module.exports = new DMMshllhSender({
	triggered_at: "message"
})
