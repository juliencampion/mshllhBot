const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils.js")

class PutTheBell extends BaseModule {
	canProcess(message) {
    return Utils.rand() < 25 && message.content.match(/cloche|cloch|abonne|aboné|abon/)
	}

	process(message) {
	  message.channel.send(":point_right: :bell:")
	}
}

module.exports = new PutTheBell({
	triggered_at: "message"
})
