const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const constants = require("./constants")

let modules = {}

client.on('ready', () => console.log(`Logged as ${client.user.tag}`));
config.modules.forEach(function(name) {
    var mod = new require("./modules/" + name + ".js")
    mod.client = client
    mod.constants = constants
    if (!modules[mod.triggered_at]) {
        modules[mod.triggered_at] = {}
    }
    modules[mod.triggered_at][name] = mod
})

for (i in config.events) {
    let event_name = i
    client.on(event_name, function(p1, p2, p3) {
        if (modules[event_name]) {
            for (c in modules[event_name]) {
                let mod = modules[event_name][c]
                if (mod.canProcess(p1, p2, p3)) {
                    mod.process(p1, p2, p3)
                }
            }
        }
    })
}

client.login(config.token);

// const Logger = require("@elian-wonhalf/pretty-logger")
// //const Quote = require('./quote.js')
// const fs = require('fs');
// const gag = require("./9gag.js");
// const mshllh = ["mashallah", "mshllh"];

/*client.on('typingStart', (channel, user) => {
    setTimeout(() => {
        if (user.typingIn(channel)) {
            channel.send("Bon alors <@" + user.id + "> tu vas te grouiller d'envoyer ton message ou je peux te promettre que ça va pas aller entre toi et moi.");
        }
    }, 20000);
});*/

// client.on('message', message => {

//     if (message.content.match(/cloche|cloch|abonne|aboné|abon/)) {
//         clochFunction(message)
//     }
// /*
//     gag.replace9GagVideo(message);

//     if (message.content.startsWith(`${prefix}quote`)) {
//         quote = Quote.quote(message);
//         return;
//     }
// */

