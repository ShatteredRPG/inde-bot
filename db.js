// require the sequelize module
const mysql = require('sync-mysql');

// require the util code
const util = require('./util.js');

const { dbhost, dbport, dbname, dbuser, dbpass } = require('./config.json');

module.exports = {
    query: function(q) {
        var success = false;
        sql
            .query(q)
            .then(function(myTableRows) {
                success = true;
                return { success, rows };
            });
    },
    randResult: function(tbl, sel) {

        var connection  = new mysql({
            host     : dbhost,
            user     : dbuser,
            password : dbpass,
            port     : dbport,
            database : dbname
          });
          
          const result = connection.query(`SELECT * FROM ${tbl};`);
          var r = util.rand(0, result.length - 1);
          return result[r][sel];
    }
};