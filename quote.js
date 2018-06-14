const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger")
const fs = require("fs");

let quoteNumber = null;

function writeQuote(_quoteNumber, message) {
    console.log("writequote", _quoteNumber);
    if (isNaN(_quoteNumber)) {
        message.channel.send("Usage !quote [numero de quote]");
    }
    else if (_quoteNumber > quoteNumber || _quoteNumber < 1) {
        message.channel.send(`La quote ${_quoteNumber} n'existe pas`);
    }
    else {
        const text = fs.readFileSync("quotes.txt", (err, data) => {}).toString();
        console.log(text);
        const quotes = text.split('\n');
        const quote = quotes[_quoteNumber - 1].split('|');
        message.channel.send({
            "embed": {
                "title": `Quote ${quote[0]}`,
                "description": `${quote[2]}`,
                "timestamp": `${quote[3]}`,
                "color": Math.floor(Math.random() * Math.floor(16777214) + 1),
                "author": {
                    "name": `${quote[1]}`
                }
            }
        });
    }
}

function getQuoteNumber(edit) {
    if (!quoteNumber) {
        if (!fs.existsSync("quotes.txt")) {
            if (edit || !quoteNumber)
                quoteNumber = 1;
        }
        else {
            const text = fs.readFileSync("quotes.txt", (err, data) => {}).toString();
            const quotes = text.split('\n');
            if (edit || !quoteNumber)
                quoteNumber = quotes.length;
        }
    }
    else {
        if (edit || !quoteNumber)
            quoteNumber++;
    }
    return quoteNumber;
}

function quote(message) {
    command = message.content.split(' ')
    if (command[1] === "add") {
        if (command[2] && command[3]) {
            author = command[2]
            detail = command.slice(3).join(' ');
            quoteNumber = getQuoteNumber(true);
            var quoteElems = [quoteNumber, author, detail, new Date().toISOString()];
            fs.writeFileSync("quotes.txt", quoteElems.join('|') + '\n', {flag: 'a'});
            message.channel.send(`La quote ${quoteNumber} a bien été ajoutée`);
        }
        else {
            message.channel.send("Usage : !quote add [auteur] [quote]");
        }
    } else if (command[1]) {
        writeQuote(command[1], message);
    }
    else {
        console.log("quote number:", getQuoteNumber(false));
        writeQuote(Math.floor(Math.random() * Math.floor(getQuoteNumber(false) - 1) + 1), message);
    }
    return
}

module.exports = {quote}