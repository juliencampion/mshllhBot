const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils")

class RandomInteractions extends BaseModule {
  canProcess(message) {
		return message.author.id != this.constants.bot_id
  }

	process(message) {
    const repeatRandom = Utils.rand(300);
    if (repeatRandom <= 2 && !message.author.bot) {
      spongeBobFunction(message);
    } else if (repeatRandom >= 299 && !message.author.bot) {
      fdpFunction(message);
    } else if ((repeatRandom === 69 || repeatRandom === 42) && !message.author.bot) {
      everyoneFunction(message);
    } else if ((repeatRandom === 100 || repeatRandom === 200) && !message.author.bot) {
      message.react("👌");
    }
  }

	everyoneFunction(message) {
		message.channel.send("@everyone :point_up: :ok_hand:");
	}

	fdpFunction(message) {
		message.channel.send(message.content + " fdp", {
			tts: true
		});
	}

	spongeBobFunction(message) {
		str = message.content.toLowerCase().split(' ')
		line = ""
		for (var h = 0; h < str.length; h++) {
	    for (var i = 0; i < str[h].length; i++) {
	      if ((i % 2) == 0) {
	        line += str[h][i].toUpperCase()
	      } else {
	        line += str[h][i]
	      }
	    }
	    line += ' '
		}
		message.channel.send(line);
	}
}

module.exports = new RandomInteractions("message")
