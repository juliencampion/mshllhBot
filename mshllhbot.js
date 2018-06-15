const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger")
const Quote = require('./quote.js')
const fs = require('fs');

const client = new Discord.Client()
const mshllh = ["mashallah", "mshllh"];

client.on('ready', () => console.log(`Logged as ${client.user.tag}`));

client.on('message', message => {
    if (!message.content.startsWith(prefix)) {
        sentence = message.content.split(' ')
        for (word = 0; word < sentence.length; word++) {
            for (var i = 0; i < mshllh.length; i++) {
                if (sentence[word] === mshllh[i]) {
                    message.channel.send({ file: "./mashallah.jpg" }).catch(Logger.exception);
                    break;
                }
            }
        }
    }

    if (message.content.startsWith(`${prefix}quote`)) {
        quote = Quote.quote(message);
        return;
    }

    let SpongeBobRepeat = Math.floor(Math.random() * Math.floor(200) + 1);
    console.log(SpongeBobRepeat, message.author.bot);
    if (SpongeBobRepeat <= 1 && !message.author.bot) {
        spongeBobFunction(message);
    }
});

function spongeBobFunction(message) {
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

client.login(token);
