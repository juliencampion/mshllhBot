const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils.js")

class NoHomoMessageSender extends BaseModule {
	canProcess(message) {
		return message.content.match(/💙|❤|💚|💜|🖤|💛|\\<3|<3/) && Utils.rand() > 50 && message.author.id != this.constants.bot_id
	}

	process(message) {
		message.channel.send("#NoHomo bien sûr")
	}
}

module.exports = new NoHomoMessageSender("message")
