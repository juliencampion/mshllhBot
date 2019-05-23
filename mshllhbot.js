const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const constants = require("./constants")
const events_configuration = require("./events_configuration.js")

let modules = {}

client.on('ready', () => console.log(`Logged as ${client.user.tag}`));
config.modules.forEach(function(name) {
    var mod = new require("./modules/" + name + ".js")
    mod.client = client
    mod.constants = constants
    if (!modules[mod.config.triggered_at]) {
        modules[mod.config.triggered_at] = {}
    }
    modules[mod.config.triggered_at][name] = mod
})

for (i in config.events) {
    let event_name = i
    client.on(event_name, function(p1, p2, p3) {
        if (modules[event_name] && events_configuration[event_name](p1, p2, p3)) {
            for (c in modules[event_name]) {
                let mod = modules[event_name][c]
                if (mod.canProcess(p1, p2, p3)) {
                    mod.process(p1, p2, p3)
                    if (mod.config.stopPropagation) {
                        return;
                    }
                }
            }
        }
    })
}

client.login(config.token);
