// require the sequelize module
const sequelize = require('sequelize');

const { dbhost, dbport, dbname, dbuser, dbpass } = require('./config.json');

const sql = new sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    dialect: 'mysql',
      // To create a pool of connections
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
})

module.exports = {
    query: function(q) {
        var success = false;
        var rows = [];
        sql
            .query(q)
            .success(function(myTableRows) {
                success = true;
                rows = myTableRows;
            });
        return { success, rows};
    },
    selectAll: function(tbl) {
        sql
        .query(`SELECT * FROM ${tbl}`)
        .success(function(myTableRows) {
            return myTableRows;
        });
    }
};