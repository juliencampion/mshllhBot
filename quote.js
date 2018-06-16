const {prefix, token} = require('./config.json')
const Logger = require("@elian-wonhalf/pretty-logger")
const fs = require("fs");

let quoteNumber = null;
const quoteFile = "./quotes/quotes.txt";
const fieldSeparator = "|";
const lineSeparator = "\n";

function readSizedString(text, separator) {
    const separatorIndex = text.indexOf(fieldSeparator);
    const stringSize = parseInt(text.substr(0, separatorIndex));
    const retString = text.substr(separatorIndex + fieldSeparator.length, stringSize);
    const retText = text.substr(separatorIndex + fieldSeparator.length + stringSize);
    //We dont delete the next separator here because we cannot know if it's a line separator,
    // or a field separator
    return [retString, retText];
}

function extractQuotesFromText(text) {
    retQuotes = [];
    while (text.length > 0) {
        [quote, text] = readSizedString(text);
        retQuotes.push(quote);
        text = text.substr(lineSeparator.length);
    }
    return retQuotes;
}

function writeQuote(_quoteNumber, message) {
    console.log("writequote", _quoteNumber);
    if (isNaN(_quoteNumber)) {
        message.channel.send("Usage !quote [numero de quote]");
    }
    else if (_quoteNumber > quoteNumber || _quoteNumber < 1) {
        message.channel.send(`La quote ${_quoteNumber} n'existe pas`);
    }
    else {
        text = fs.readFileSync(quoteFile, (err, data) => {}).toString();
        console.log(text);
        quotes = extractQuotesFromText(text);
        quotes.forEach(function(quote) {
            [title, quote] = readSizedString(quote);
            if (title != _quoteNumber)
                return
            quote = quote.substr(fieldSeparator.length);
            [name, quote] = readSizedString(quote);
            quote = quote.substr(fieldSeparator.length);
            [description, timestamp] = readSizedString(quote);
            timestamp = timestamp.substr(fieldSeparator.length);
            message.channel.send({
                "embed": {
                    "title": `Quote ${title}`,
                    "description": `${description}`, 
                    "timestamp": `${timestamp}`,
                    "color": Math.floor(Math.random() * Math.floor(16777214) + 1),
                    "author": {
                        "name": `${name}`
                    }
                }
            });
        });
    }
}

function getQuoteNumber(edit) {
    if (!quoteNumber) {
        if (!fs.existsSync(quoteFile)) {
            if (edit || !quoteNumber)
                quoteNumber = 1;
        }
        else {
            text = fs.readFileSync(quoteFile, (err, data) => {}).toString();
            quotes = extractQuotesFromText(text, fieldSeparator);
            console.log("quote number:", quotes.length);

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
    if (!quoteNumber)
        getQuoteNumber(false);
    command = message.content.split(' ')
    if (command[1] === "add") {
        if (command[2] && command[3]) {
            author = command[2]
            detail = command.slice(3).join(' ');
            quoteNumber = getQuoteNumber(true);
            var quoteElems = [quoteNumber.toString().length, quoteNumber, author.length, author, detail.length, detail, new Date().toISOString()];
            quoteElems.unshift(quoteElems.join(fieldSeparator).length);
            fs.writeFileSync(quoteFile, quoteElems.join(fieldSeparator) + lineSeparator, {flag: 'a'});
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
        // Be careful after we implement the delete, the number will not be equal to the title of the quote
        writeQuote(Math.floor(Math.random() * Math.floor(getQuoteNumber(false) - 1) + 1), message);
    }
    return
}

module.exports = {quote}
