// require the discord.js module
const Discord = require('discord.js');

const client = new Discord.Client();

// create a new Discord client
const { prefix, token } = require('./config.json');

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

        prefixHandler(msg, cmd, args);
    }
    /*
    else if (msg.content.toLower.contains('')) {
        // inline commands
    }*/
});

// login to Discord with your app's token
client.login(token);

function prefixHandler(msg, cmd, args) {
    if (cmd === `mds`) {
        var modSign = '';
        var rawArg = args[0];
        var newArg = '';
        var rating = 0;
        var mod = 0;
        var modMult = 1;

        if (rawArg.includes('-')) {
            modSign = '-';
            modMult = -1;
        }
        else if (rawArg.includes('+')) {
            modSign = '+';
        }

        if (modSign !== '') {
            console.log(newArg);
            newArg = rawArg.split(modSign);
            rating = newArg[0];
            mod = newArg[1] * modMult;
        }
        else {
            rating = rawArg;
        }
        
        var d10c = Math.floor(rating / 4);
        var d8c = Math.floor( (rating % 4) / (rating % 4 + 1) + .25);
        var d6c = Math.floor( (rating % 4) / (rating % 4 + 1) + .45);
        var d4c = Math.floor( (rating % 4) / (rating % 4 + 1) + .50);
        if (d8c > 0) {
            d6c = 0;
            d4c = 0;
        }
        else if (d6c > 0) {
            d4c = 0;
        }      

        var d10r = rollMultiple(d10c, 1, 10);
        var d8r = rollMultiple(d8c, 1, 8);
        var d6r = rollMultiple(d6c, 1, 6);
        var d4r = rollMultiple(d4c, 1, 4);

        var result = d10r + d8r + d6r + d4r + mod;

        //msg.channel.send(`${msg.author} rolled Rating **${rating}** (${d10c}d10+${d8c}d8+${d6c}d6+${d4c}d4${modSign}${mod}) = **${result}**`)
        msg.channel.send(concatRoll(msg.author, rating, d10c, d8c, d6c, d4c, modSign, mod, result));

    }
    else if (cmd === `roll` || cmd === `r`) {
        // do basic roll logic
        msg.channel.send("This is where I would tell you what you rolled via dice if my programmers would ever get around to it.");
    }
}

function concatRoll(author, rating, d10c, d8c, d6c, d4c, modSign, mod, result)
{
    var str = `${author} rolled Rating **${rating}** (`;
    if (d10c > 0) {
        str += `${d10c}d10+`;
    }
    if (d8c > 0) {
        str += `${d8c}d8+`;
    }
    if (d6c > 0) {
        str += `${d8c}d6+`;
    }
    if (d4c > 0) {
        str += `${d8c}d4`;
    }
    if (str.endsWith('+')) {
        str = str.slice(0, -1);
    }
    if (mod > 0) {
        str += modSign + mod;
    }
    str += `) = **${result}**`;
    return str;
}

function dieRoll(min, max) {  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollMultiple(count, min, max) {
    var result = 0;
    for (var i = 0; i <= count; i++) {
        result += dieRoll(min, max);
    }
    return result;
}