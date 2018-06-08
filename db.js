// require the sequelize module
// const mysql = require('sync-mysql');

// require the util code
const util = require('./util.js');

const { dbhost, dbport, dbname, dbuser, dbpass,
    dbconlimit, tblNews, tblGreet, tblIntro, tblOutro,
    } = require('./config.json');

const mysqljs = require('mysqljs');
const pool = mysqljs.createPool({
    connectionLimit: dbconlimit,
    waitForConnections: true,
    host: dbhost,
    port: dbport,
    user: dbuser,
    database: dbname,
    password: dbpass,
});

function selectQueryStr(tbl) {
    return `SELECT * FROM ${tbl};`;
}

function getRandResult(results, sel) {
    const r = util.rand(0, results.length - 1);
    return results[r][sel];
}

function errResponse(msg, text) {
    msg.channel.send(text);
}

module.exports = {
    getNews: function(msg) {
        pool.getConnection(function(err, con) {
            let greet, intro, news, outro;
            con.query(selectQueryStr(tblGreet), function(err, results) {
                greet = getRandResult(results, 'greet');
            });
            con.query(selectQueryStr(tblIntro), function(err, results) {
                intro = getRandResult(results, 'intro');
            });
            con.query(selectQueryStr(tblNews), function(err, results) {
                news = getRandResult(results, 'newsDesc');
            });
            con.query(selectQueryStr(tblOutro), function(err, results) {
                outro = getRandResult(results, 'outro');
            });
            con.release();
            msg.channel.send(`${greet} ${msg.author}, ${intro} ${news} ${outro}`);
        });
    },
    phraseAdd: function(msg, tbl, item, phrase) {
        const errText = `Sorry, ${msg.author}, my pencil must be broken. I can't add **${item}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tbl} (${item}) VALUES ('${phrase}')`, function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Thanks ${msg.author}, I've added ${item} to my news list.`);
                    }
                });
            }
            con.release();
        });
    },
    phraseRemove: function(msg, tbl, phraseType, phrase) {
        const errText = `Sorry, ${msg.author}, my eraser must be broken. I can't remove **${phrase}** from my **${phraseType}** phrases right now.`;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tbl} WHERE ID = '${phrase}'`, function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Alrighty ${msg.author}, I won't use that phrase in my **${phraseType}** anymore.`);
                    }
                });
            }
            con.release();
        });
    },
    phraseList: function(msg, tbl, descCol) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'ID';
        let response = `This is what I have for ${descCol}, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tbl), function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        for (let i = 0; i < results.length; i++) {
                            response += `\r\n-- **${results[i][itemCol]}** : ${results[i][descCol]}`;
                        }
                        msg.channel.send(response);
                    }
                });
            }
            con.release();
        });
    },
    newsAdd: function(msg, newsItem, newsDesc) {
        const errText = `Sorry, ${msg.author}, my pencil must be broken. I can't add **${newsItem}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tblNews} (newsItem, newsDesc) VALUES ('${newsItem}', '${newsDesc}')`, function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Thanks ${msg.author}, I've added ${newsItem} to my news list.`);
                    }
                });
            }
            con.release();
        });
    },
    newsRemove: function(msg, newsItem) {
        const errText = `Sorry, ${msg.author}, my eraser must be broken. I can't remove **${newsItem}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tblNews} WHERE newsItem = '${newsItem}'`, function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Alrighty ${msg.author}, I won't tell members about **${newsItem}** anymore.`);
                    }
                });
            }
            con.release();
        });
    },
    newsList: function(msg) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'newsItem';
        const descCol = 'newsDesc';
        let response = `This is what I have for news articles, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err.length > 0) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tblNews), function(err, results) {
                    if (err.length > 0 || results === false) {
                        errResponse(errText);
                    }
                    else {
                        for (let i = 0; i < results.length; i++) {
                            response += `\r\n-- **${results[i][itemCol]}** : ${results[i][descCol]}`;
                        }
                        msg.channel.send(response);
                    }
                });
            }
            con.release();
        });
    },
/*
    query: function(q) {
        const connection = new mysql({
            host     : dbhost,
            user     : dbuser,
            password : dbpass,
            port     : dbport,
            database : dbname,
          });

          const result = connection.query(q);

          connection.dispose();

          return result;

    },
    selectAll: function(tbl) {
        const connection = new mysql({
            host     : dbhost,
            user     : dbuser,
            password : dbpass,
            port     : dbport,
            database : dbname,
          });

          const result = connection.query(`SELECT * FROM ${tbl};`);

          connection.dispose();

          return result;

    },
    randResult: function(tbl, sel) {

        const connection = new mysql({
            host     : dbhost,
            user     : dbuser,
            password : dbpass,
            port     : dbport,
            database : dbname,
          });

          const result = connection.query(`SELECT * FROM ${tbl};`);
          const r = util.rand(0, result.length - 1);


          connection.dispose();

          return result[r][sel];
    },*/
};