const db = require('./db.js');
const util = require('./util.js');

const { welcomeChannel } = require('./config.json');

module.exports = {
    // allows members to ask for a news article
    news: function(msg) {
        db.getNews(msg);
    },
    setphrase: function(msg, args) {

        if(util.isAllowed(msg.member)) {
            // !setphrase add greet blah blah blah blah
            const author = msg.author;
            const getSet = args[0];
            const tbl = `t_${args[1]}`;

            if (getSet.toLowerCase() === 'add') {
                const phrase = args.slice(2).join(' ');
                db.phraseAdd(msg, tbl, args[1], phrase);
            }
            else if (getSet.toLowerCase() === 'rem') {
                db.phraseRemove(msg, tbl, args[1], args[2]);
            }
            else if (getSet.toLowerCase() === 'list') {

                db.phraseList(msg, tbl, args[1]);
            }
        else {
            msg.channel.send(`NO can do ${author}, you're not a trusted wordsmith here on Feneryss.`);
        }
      }
    },
    // adds, removes, and lists news artiles by name
    setnews: function(msg, args) {
        const author = msg.author;
        // if someone is in the trusted group, allow them to change the news
        if(util.isAllowed(msg.member)) {
            const getSet = args[0];
            const newsItem = args[1];
            // add news to the db
            if (getSet.toLowerCase() === 'add') {
                const newsDesc = args.slice(2).join(' ');
                db.newsAdd(msg, newsItem, newsDesc);
            }
            // remove news from the db
            else if (getSet.toLowerCase() === 'rem') {
                db.newsRemove(msg, newsItem);
            }
            if (getSet.toLowerCase() === 'list') {
                db.newsList(msg);
            }
        }
        else {
            msg.channel.send(`Sorry ${author}, you're not a trusted source of news here on Feneryss.`);
        }
    },
    // allows members to ask for a drink
    drink: function (msg) {
        db.getDrink(msg);
    },
    setdrink: function (msg, args) {
        const author = msg.author;
        // if someone is in the trusted group, allow them to change the news
        if(util.isAllowed(msg.member)) {
            const getSet = args[0];
            const drinkItem = args[1];
            // add news to the db
            if (getSet.toLowerCase() === 'add') {
                const drinkDesc = args.slice(2).join(' ');
                db.drinkAdd(msg, drinkItem, drinkDesc);
            }
            // remove news from the db
            else if (getSet.toLowerCase() === 'rem') {
                db.drinkRemove(msg, drinkItem);
            }
            if (getSet.toLowerCase() === 'list') {
                db.drinkList(msg);
            }
        }
        else {
            msg.channel.send(`Mmm no, that doesn't sound like a good drink recipe, ${author}. Find someone who has some better ideas.`);
        }
    },
    // allows members to ask for food
    food: function (msg) {
        db.getFood(msg);
    },
    setfood: function (msg, args) {
        const author = msg.author;
        // if someone is in the trusted group, allow them to change the news
        if(util.isAllowed(msg.member)) {
            const getSet = args[0];
            const foodItem = args[1];
            // add news to the db
            if (getSet.toLowerCase() === 'add') {
                const foodDesc = args.slice(2).join(' ');
                db.foodAdd(msg, foodItem, foodDesc);
            }
            // remove news from the db
            else if (getSet.toLowerCase() === 'rem') {
                db.foodRemove(msg, foodItem);
            }
            if (getSet.toLowerCase() === 'list') {
                db.foodList(msg);
            }
        }
        else {
            msg.channel.send(`Ehhh no thanks. I'll find someone else for good meals, ${author}.`);
        }
    },
    addRole: function (msg, args) {
        let author = msg.author;
        let email = args[0];
        db.setRoles(author, email);
        // not sure what to do here
    },
    // Function for onjoin
    greet: function (guild, member, prefix) {
        guild.channels.get(welcomeChannel).send(
            `Hey; ${member}! Welcome to the official **INDE** Discord Server, home of **Shattered**, the Grimdark RPG. 
            If you are a Kickstarter or Backerkit backer, please PM me the following (*{EMAIL]* is the email you used): 
                *${prefix}role [EMAIL]*. If you're interested in purchasing our work, please check out our shop: 
                http://shop.neverdarkenough.com/ . Enjoy your stay!`);
    },
    // Replies with a list of all commands
    help: function (msg, prefix) {      
        msg.channel.send(`OK ${msg.author}, here are my commands:
                        \r\n**Commands:**
                        \r\n*${prefix}mds [rating]*
                        \r\n*${prefix}roll [dice]*
                        \r\n*${prefix}r [dice]*
                        \r\n*${prefix}news*
                        \r\n*${prefix}drink*
                        \r\n*${prefix}food*
                        \r\n**Admin Commands**
                        \r\n*${prefix}setnews [add/rem/list]*
                        \r\n*${prefix}setphrase [add/rem/list]*
                        \r\n*${prefix}setdrink [add/rem/list]*
                        \r\n*${prefix}setfoods [add/rem/list]*`);
    }
};