const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils.js")
const Logger = require("@elian-wonhalf/pretty-logger")

class MashallahImageSender extends BaseModule {
	canProcess(message) {
		return message.content.startsWith(this.constants.command_prefix) && message.author.id != this.constants.bot_id
	}

	process(message) {
		var sentence = message.content.split(' ')
		for (word = 0; word < sentence.length; word++) {
	    for (var i = 0; i < mshllh.length; i++) {
        if (sentence[word].toLowerCase() === mshllh[i]) {
          message.channel.send({ file: this.constants.mashallah_image }).catch(Logger.exception);
          break;
        }
      }
    }
  }
}

module.exports = new MashallahImageSender("message")
