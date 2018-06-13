const Discord = require('discord.js')
const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger");

const client = new Discord.Client()
const mshllh = ["mashallah", "mshllh"];

client.on('ready', () => console.log(`Logged as ${client.user.tag}`));

client.on('message', message => {
    for (var i=0; i < mshllh.length; i++) {
        if (message.content.includes(mshllh[i])) {
            message.channel.send({file:"./mashallah.jpg"}).catch(Logger.exception);
            break;
        }
    }
});

client.login(token);
