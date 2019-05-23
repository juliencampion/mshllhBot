const BaseModule = require("./BaseModule.js")

class PutTheBell extends BaseModule {
	canProcess(message) {
    return message.content.match(/cloche|cloch|abonne|aboné|abon/) && message.author.id != this.constants.bot_id
	}

	process(message) {
	  message.channel.send(":point_right: :bell:")
	}
}

module.exports = new PutTheBell("message")
