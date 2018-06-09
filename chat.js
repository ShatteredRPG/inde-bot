const db = require('./db.js');
const util = require('./util.js');

// const { tblNews } = require('./config.json');

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
};