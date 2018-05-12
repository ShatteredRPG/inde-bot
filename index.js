// require the discord.js module
const Discord = require('discord.js');
// require the sequelize module
const Sequelize = require('sequelize');
// require the dice code
const dice = require('./dice.js');
//creates a discord client
const client = new Discord.Client();
// sets config vars
const { prefix, token, host, port, dbname, dbuser, dbpass } = require('./config.json');


//const Cmds = require('./cmd.js');

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
    if (cmd === `mds`) {
        dice.mds(msg, args);
    }
    else if (cmd === `roll` || cmd === `r`) {
        // do basic roll logic
        msg.channel.send('This is where I would tell you what you rolled via dice if my programmers would ever get around to it.');
    }
    else if (cmd === ``) {

    }
}