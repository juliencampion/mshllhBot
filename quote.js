const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger")
const fs = require("fs");
const db = require(__dirname + "/server/models");
const dbQuotes = db.sequelize.import(__dirname + "/server/models/quotes");

function randomQuote(message) {
  dbQuotes.sync();
  dbQuotes.count()
  .then(nb => {
    randNumber = Math.floor((Math.random() * nb) + 1);
    writeQuote(message, randNumber);
  });
}

function writeQuote(message, _quoteNumber) {
  if (isNaN(_quoteNumber)) {
    message.channel.send("Usage !quote [numero de quote]");
  } else {
    dbQuotes.sync();
    dbQuotes.findById(_quoteNumber)
    .then(q => {
      console.log("quote found");
      dateTimestamp = new Date(q.createdAt);
      timestamp = dateTimestamp.toISOString();
      message.channel.send({
        "embed": {
        "title": `Quote ${_quoteNumber}`,
        "description": `${q.description}`,
        "timestamp": `${timestamp}`,
        "color": Math.floor(Math.random() * Math.floor(16777214) + 1),
        "author": {
          "name": `${q.author}`
          }
        }
      });
    }).catch(err => {
      console.log("fail to found quote", err);
      message.channel.send(`La quote ${_quoteNumber} n'existe pas`);
    });
  }
}

function addQuote(message, author, detail) {
  dbQuotes.sync();
  dbQuotes.build({
    description: `${detail}`,
    author: `${author}`
  }).save()
  .then(
    () => {
      console.log("quote created");
      message.channel.send(`La quote a bien été ajoutée`);
  }).catch(
    err => {
      console.log("fail to create quote", err);
      message.channel.send(`La quote n'a pas été ajoutée`);
  });
}

function quote(message) {
  command = message.content.split(' ');

  if (command[1] === "add") {
    if (command[2] && command[3]) {
      author = command[2];
      detail = command.slice(3).join(' ');
      addQuote(message, author, detail);
    } else {
      message.channel.send("Usage : !quote add [auteur] [quote]");
    }
  } else if (command[1]) {
    writeQuote(message, command[1]);
  } else {
    randomQuote(message);
  }
  return
}

module.exports = {quote}
