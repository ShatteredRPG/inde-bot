const jf = require('jsonfile');

module.exports = {
    news: function(msg, args) {
        //read the news title from the forums
        const author = msg.author;
        msg.channel.send(``);
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