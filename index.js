// require the discord.js module
const Discord = require('discord.js');
// require the dice code
const dice = require('./dice.js');
// require the chat code
const chat = require('./chat.js');
// creates a discord client
const client = new Discord.Client();
// sets config vars
const { prefix, token } = require('./config.json');


// const Cmds = require('./cmd.js');

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

// message logic
client.on('message', msg => {
    if (msg.author.bot) return;
    // if the prefix exists, run commands
    if (msg.content === '!ping') {
        msg.channel.send('Pong!');
    }
    else if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();

        cmdHandler(msg, cmd, args);
    }
    /*
    else if (msg.content.toLower.contains('')) {
        // inline commands
        inlineHandler(msg);
    }*/
});

// login to Discord with your app's token
client.login(token);

function cmdHandler(msg, cmd, args) {
    if (cmd.toLowerCase() === 'mds') {
        dice.mds(msg, args);
    }
    else if (cmd.toLowerCase() === 'roll' || cmd.toLowerCase() === 'r') {
        dice.dice(msg, args);
    }
    else if (cmd.toLowerCase() === 'news') {
        chat.news(msg);
    }
    else if (cmd.toLowerCase() === 'setnews') {
        chat.setnews(msg, args);
    }
}