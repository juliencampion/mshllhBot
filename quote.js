const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger")

function quote(message) {
    command = message.content.split(' ')
    if (command[1] = "add") {
        author = command[2]
        detail = command.slice(2).join(' ')
        message.channel.send("add received")
        message.channel.send(`quote is : ${detail}`)
    }
    return
}

module.exports = {quote}