const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils.js")

class NoHomoMessageSender extends BaseModule {
	canProcess(message) {
		return Utils.rand() < 25 && message.content.match(/💙|❤|💚|💜|🖤|💛|\\<3|<3/) && Utils.rand() > 50
	}

	process(message) {
		message.channel.send("#NoHomo bien sûr")
	}
}

module.exports = new NoHomoMessageSender({
	triggered_at: "message"
})
