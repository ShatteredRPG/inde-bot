const db = require('./db.js');
const util = require('./util.js');

const { tblNews, tblGreet, tblIntro, tblOutro } = require('./config.json');

module.exports = {
    // allows members to ask for a news article
    news: function(msg, args) {
        //read a json file somewhere to 
        const author = msg.author;

        //gets all the news articles
        var greet = db.randResult(tblGreet, 'greet');
        var intro = db.randResult(tblIntro, 'intro');
        var news = db.randResult(tblNews, 'newsDesc');
        var outro = db.randResult(tblOutro, 'outro');
        msg.channel.send(`${greet} ${author}, ${intro} ${news} ${outro}`);
    },
    setphrase: function(msg, args) {

        if(util.isAllowed(msg.member)) {
            // !setphrase add greet blah blah blah blah
            const author = msg.author;
            const getSet = args[0];
            const tbl = `t_${args[1]}`;

            if (getSet.toLowerCase() === 'add') {
                const phrase = args.slice(2).join(' ');
                if(db.query(`INSERT INTO ${tbl} (${args[1]}) VALUES ('${phrase}')`)) {
                    msg.channel.send(`Thanks ${author}, I've added ${args[1]} to my news list.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my pencil must be broken. I can't add **${args[1]}** to my news right now.`);
                }
            }
            else if (getSet.toLowerCase() === 'rem') {
                if(db.query(`DELETE FROM ${tbl} WHERE ID = '${args[2]}'`)) {
                    msg.channel.send(`Alrighty ${author}, I won't use that phrase in my **${args[1]}** anymore.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my eraser must be broken. I can't remove **${args[2]}** to my **${args[1]}** phrases right now.`);
                }
            }
            else if (getSet.toLowerCase() === 'list') {
                const itemCol = 'ID';
                const descCol = args[1];
                var dbResult = db.selectAll(tbl);
                if(dbResult) {
                    var response = `This is what I have for ${args[1]}, ${author}: `;
                    for (var i = 0; i < dbResult.length; i++) {
                        response += `\r\n-- **${dbResult[i][itemCol]}** : ${dbResult[i][descCol]}`;
                    }
                    msg.channel.send(response);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, I can find my notepad right now, come back a bit later, ok?`);
                }
            }
        else {
            msg.channel.send(`NO can do ${author}, you're not a trusted wordsmith here on Feneryss.`);
        }
      }
    },
    // adds, removes, and lists news artiles by name
    setnews: function(msg, args) {
        //if someone is in the trusted group, allow them to change the news
        if(util.isAllowed(msg.member)) {
            const author = msg.author;
            const getSet = args[0];
            const newsItem = args[1];
            //add news to the db
            if (getSet.toLowerCase() === 'add') {
                var newsDesc = args.slice(2).join(' ');
                if(db.query(`INSERT INTO ${tblNews} (newsItem, newsDesc) VALUES ('${args[1]}', '${newsDesc}')`)) {
                    msg.channel.send(`Thanks ${author}, I've added ${args[1]} to my news list.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my pencil must be broken. I can't add **${args[1]}** to my news right now.`);
                }
            }
            //remove news from the db
            else if (getSet.toLowerCase() === 'rem') {
                if(db.query(`DELETE FROM ${tblNews} WHERE newsItem = '${args[1]}'`)) {
                    msg.channel.send(`Alrighty ${author}, I won't tell members about **${args[1]}** anymore.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my eraser must be broken. I can't remove **${args[1]}** to my news right now.`);
                }
            }
            if (getSet.toLowerCase() === 'list') {
                const itemCol = 'newsItem';
                const descCol = 'newsDesc';
                var dbResult = db.selectAll(tblNews);
                if(dbResult) {
                    var response = `This is what I have for news articles, ${author}: `;
                    for (var i = 0; i < dbResult.length; i++) {
                        response += `\r\n-- **${dbResult[i][itemCol]}** : ${dbResult[i][descCol]}`;
                    }
                    msg.channel.send(response);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, I can find my notepad right now, come back a bit later, ok?`);
                }
                
            }
        }
        else {
            msg.channel.send(`NO can do ${author}, you're not a trusted source of news here on Feneryss.`)
        }
    }

};

// returns a random item from the query result using the rand function in util.js
function getRandNews(s) {
    var i = util.rand(0, s.length - 1);
    return s[i];
}