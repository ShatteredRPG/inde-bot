// require the sequelize module
const mysql = require('sync-mysql');

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

function getQueryStr(tbl) {
    return `SELECT * FROM ${tbl};`;
}

function getRandResult(results, sel) {
    const r = util.rand(0, results.length - 1);
    return results[r][sel];
}

module.exports = {
    getNews: function(msg) {
        pool.getConnection(function(err, con) {
            let greet, intro, news, outro;
            con.query(getQueryStr(tblGreet), function(err, results) {
                greet = getRandResult(results, 'greet');
            });
            con.query(getQueryStr(tblIntro), function(err, results) {
                intro = getRandResult(results, 'intro');
            });
            con.query(getQueryStr(tblNews), function(err, results) {
                news = getRandResult(results, 'newsDesc');
            });
            con.query(getQueryStr(tblOutro), function(err, results) {
                outro = getRandResult(results, 'outro');
            });
            con.release();
            msg.channel.send(`${greet} ${msg.author}, ${intro} ${news} ${outro}`);
        });
    },
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
    },
};