const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils")
const Logger = require("@elian-wonhalf/pretty-logger")

class DMMshllhSender extends BaseModule {
    canProcess(message) {
        return Utils.rand() && message.author.id != this.constants.bot_id
    }
	process(message) {
        message.author.send({ file: this.constants.mashallah_image }).catch(Logger.exception);
  }
}

module.exports = new DMMshllhSender("message")
