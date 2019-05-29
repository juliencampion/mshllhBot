class Utils {
	static rand(to = 100) {
		return Math.floor(Math.random() * (to + 1))
	}

	static spongeBob(str) {
		var str = str.toLowerCase().split(' ')
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
		return line
	}
}

module.exports = Utils
