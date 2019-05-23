const constants = require("./constants.js")

module.exports = {
	'message': function(message) {
		return message.author.id != constants.bot_id
	},
	'messageDelete': function(message) {
		return true
	},
	'messageUpdate': function(old_m, new_m) {
		return true
	}
}
