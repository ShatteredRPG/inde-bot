// require the discord.js module
const Discord = require('./discord.js');

// create a new Discord client
const { prefix, token } = require('./config.json');

const Cmds = require('/cmd/cmd.js');

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

// message logic
client.on('message', msg => {
    if (message.author.bot) return;
    
    // if the prefix exists, run commands
    if (msg.content.startsWith(prefix)) {
        var {cmdStr, args} = getArgs(msg);
        Cmd.prefixHandler(msg, prefix, cmd, args);
    }

    /*
    else if (msg.content.toLower.contains('')) {
        // inline commands
    }*/
});

// login to Discord with your app's token
client.login(token);

function getArgs(msg) {
    const args = message.content.slice(prefix.length).split(' ');
    const cmd = args.shift().toLowerCase();
    return { cmdStr, args };
}