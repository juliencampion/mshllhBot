const BaseModule = require("./BaseModule.js")
const Utils = require("../Utils")

class RandomInteractions extends BaseModule {
	process(message) {
    const repeatRandom = Utils.rand(300);
    if (repeatRandom <= 2) {
      this.spongeBobFunction(message);
    } else if (repeatRandom >= 299) {
      this.fdpFunction(message);
    } else if ((repeatRandom === 69 || repeatRandom === 42)) {
      this.everyoneFunction(message);
    } else if ((repeatRandom === 100 || repeatRandom === 200)) {
      this.reactFunction(message)
    }
  }

	everyoneFunction(message) {
		message.channel.send("@everyone :point_up: :ok_hand:");
	}

	reactFunction(message) {
		message.react("👌");
	}

	fdpFunction(message) {
		message.channel.send(message.content + " fdp", {
			tts: true
		});
	}

	spongeBobFunction(message) {
		var str = message.content.toLowerCase().split(' ')
		var line = ""
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

module.exports = new RandomInteractions({
	triggered_at: "message"
})
