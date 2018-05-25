const jf = require('jsonfile');

module.exports = {
    news: function(msg, args) {
        //read a json file somewhere to 
        const author = msg.author;
        var randGreet = `Hey`;
        var randIntro = `I've got some news for ya.`;
        var randNews = `This is random news around Feneryss`;
        var randOutro = `Anything else? A drink perhaps?`;
        msg.channel.send(`${randGreet}${author}, ${randIntro}${randNews} ${randOutro}`);
    },
    setnews: function(msg, args) {
        const author = msg.author;
        const getSet = args[0];
        if(msg.member.roles.find('name', 'Staff')) {
            if (getSet.toLowerCase() === 'add') {
                msg.channel.send(`Thanks ${author}, I've added ${args[1]} to my news list.`);
                //TODO: ailibty to add news articles
            }
            else if (getSet.toLowerCase() === 'rem') {
                msg.channel.send(`Alrighty ${author}, I won't tell members about ${args[1]} anymore.`);
                //TODO: ability to remove news artiles
            }
            else if (getSet.toLowerCase() === 'list') {
                msg.channel.send(`This is what I have for news articles, ${author}:`);
                //TODO: get news articles
            }


        }
        else {
            msg.channel.send(`Sorry ${author}, you're not a trusted source of news here on Feneryss.`)
        }
    }

};

function readJSON(fileName, entry) {
    jf.readFile('/path/to/file.json', function(err, obj) {
        // obj contains JSON data
      });
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}