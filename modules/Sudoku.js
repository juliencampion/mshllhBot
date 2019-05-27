const BaseModule = require("./BaseModule.js")

class Sudoku extends BaseModule {
    canProcess(message) {
        return message.content == "/mines";
    }

    process(message) {
    message.channel.send("Demande à <@215150729130803200> fdp")
  }
}

module.exports = new Sudoku({
    triggered_at: "message"
})
