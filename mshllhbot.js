const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger");
const fs = require('fs');

const client = new Discord.Client()
const mshllh = ["mashallah", "mshllh"];

client.on('ready', () => console.log(`Logged as ${client.user.tag}`));

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        let arguments = message.content.split(' ');
        Logger.debug(arguments);
        switch (arguments[0]) {
            /*case 'poll':
                switch (arguments[2]) {
                    case 'create':

                }

                message.channel.send("ceci est un poll");
                break;*/
            case '!quote':
                switch (arguments[1]) {
                    case 'add':
                        const sentence = message.content.split('"');
                        /*fs.readFile('quotes.txt', (err, data) => {
                            Logger.debug(err, data);
                        });*/
                        message.channel.send(({
                            embed: {
                                title: sentence[1],
                                description: "1",
                                timestamp: Date.now()
                            },
                            author: {
                                name: "Kiyonari"
                            },
                            message: "test"
                        }).catch(Logger.exception));
                }
            default:
        }
    }
    const words = message.content.split(' ');
    let isMashallah = false;
    words.forEach((word) => {
        for (var i=0; i < mshllh.length; i++) {
            isMashallah = true;
        }
    });

    if (isMashallah) {
        message.channel.send({file: "./mashallah.jpg"}).catch(Logger.exception);
    }
});

client.login(token);
