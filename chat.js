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
    // adds, removes, and lists news artiles by name
    setnews: function(msg, args) {
        const author = msg.author;
        const getSet = args[0];
        const newsItem = args[1];
        var newsDesc = args.shift().shift().join(' ');
        if(msg.member.roles.find('name', 'Staff')) {
            if (getSet.toLowerCase() === 'add') {
                if(db.query(`INSERT INTO ${tblNews} (itemName, itemDesc) VALUES ('${args[1]}', '${args[2]}')`)[0]) {
                    msg.channel.send(`Thanks ${author}, I've added ${args[1]} to my news list.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my pencil must be broken. I can't add **${args[1]}** to my news right now.`);
                }
            }
            else if (getSet.toLowerCase() === 'rem') {
                if(db.query(`DELETE FROM ${tblNews} WHERE itemName = '${args[1]}'`)[0]) {
                    msg.channel.send(`Alrighty ${author}, I won't tell members about **${args[1]}** anymore.`);
                }
                else {
                    msg.channel.send(`Sorry, ${author}, my eraser must be broken. I can't remove **${args[1]}** to my news right now.`);
                }
            }
            else if (getSet.toLowerCase() === 'list') {
                var dbResult = db.query(`DELETE FROM ${tblNews} WHERE itemName = '${args[1]}'`);
                if(dbResult[0]) {
                    var response = `This is what I have for news articles, ${author}: `;
                    for (var i = 0; i < dbResult[1].length; i++) {
                        response += `**${dbResult[1][i]}**, `;
                    }
                    response = response.substring(0, response.length - 2);
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