// require the mysqljs module
const mysql = require('mysql');

// require the util code
const util = require('./util.js');

const { dbhost, dbport, dbname, dbuser, dbpass,
    dbconlimit, tblNews, tblGreet, tblIntro, tblOutro,
    tblDrink,tblFood, tblsRoles
    } = require('./config.json');

const pool = mysql.createPool({
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

function getRandResult(results) {
    const r = util.rand(0, results.length - 1);
    return results[r];
}

function errResponse(msg, text) {
    msg.channel.send(text);
}

module.exports = {
    // Returns a random news item
    getNews: function(msg) {
        pool.getConnection(function(err, con) {
            let greet, intro, news, outro;
            con.query(selectQueryStr(tblGreet), function(err, results) {
                greet = getRandResult(results)['greet'];
            
                con.query(selectQueryStr(tblIntro), function(err, results) {
                    intro = getRandResult(results)['intro'];
                    
                    con.query(selectQueryStr(tblNews), function(err, results) {
                        news = getRandResult(results)['newsDesc'];
                    
                        con.query(selectQueryStr(tblOutro), function(err, results) {
                            outro = getRandResult(results)['outro'];
                            msg.channel.send(`${greet} ${msg.author}, ${intro} ${news} ${outro}`);
                        });
                    });
                });
            });
            con.release();
        });
    },
    // Allows adding phrases without phpMyAdmin
    phraseAdd: function(msg, tbl, item, phrase) {
        const errText = `Sorry, ${msg.author}, my pencil must be broken. I can't add **${item}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tbl} (${item}) VALUES ('${phrase}')`, function(err, results) {
                    if (err != null || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Thanks ${msg.author}, I've added **${phrase}** to my **${item}** list.`);
                    }
                });
            }
            con.release();
        });
    },
    // Allows removing phrases without phpMyAdmin
    phraseRemove: function(msg, tbl, phraseType, phrase) {
        const errText = `Sorry, ${msg.author}, my eraser must be broken. I can't remove **${phrase}** from my **${phraseType}** phrases right now.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tbl} WHERE ID = '${phrase}'`, function(err, results) {
                    if (err != null || results === false) {
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
    // Allows viewing the phrase list without phpMyAdmin
    phraseList: function(msg, tbl, descCol) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'ID';
        let response = `This is what I have for ${descCol}, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tbl), function(err, results) {
                    if (err != null || results === false) {
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
    // Allows adding news without phpMyAdmin
    newsAdd: function(msg, newsItem, newsDesc) {
        const errText = `Sorry, ${msg.author}, my pencil must be broken. I can't add **${newsItem}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tblNews} (newsItem, newsDesc) VALUES ('${newsItem}', '${newsDesc}')`, function(err, results) {
                    if (err != null || results === false) {
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
    // Allows removing news without phpMyAdmin
    newsRemove: function(msg, newsItem) {
        const errText = `Sorry, ${msg.author}, my eraser must be broken. I can't remove **${newsItem}** to my news right now.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tblNews} WHERE newsItem = '${newsItem}'`, function(err, results) {
                    if (err != null || results === false) {
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
    // Allows viewing the news list without phpMyAdmin
    newsList: function(msg) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'newsItem';
        const descCol = 'newsDesc';
        let response = `This is what I have for news articles, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tblNews), function(err, results) {
                    if (err != null || results === false) {
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
    // returns a random drink
    getDrink: function(msg) {
        pool.getConnection(function(err, con) {
            let greet, drink, drinkItem, drinkDesc;
            con.query(selectQueryStr(tblGreet), function(err, results) {
                greet = getRandResult(results)['greet'];
            
                con.query(selectQueryStr(tblDrink), function(err, results) {
                    drink = getRandResult(results);
                    drinkItem = drink['drinkItem'];
                    drinkDesc = drink["drinkDesc"];
                    msg.channel.send(`${greet} ${msg.author}, I'll whip you up a ${drinkItem}. It's made with ${drinkDesc}.`);
                });
            });
            con.release();
        });
    },
    // Allows adding drinks without phpMyAdmin
    drinkAdd: function(msg, drinkItem, drinkDesc) {
        const errText = `Sorry, ${msg.author}, I misplayced my drink list so I can't add **${drinkItem}** to it right now.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tblDrink} (drinkItem, drinkDesc) VALUES ('${drinkItem}', '${drinkDesc}')`, function(err, results) {
                    if (err != null || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Nice! I've added **${drinkItem}** to my drink list, ${msg.author}.`);
                    }
                });
            }
            con.release();
        });
    },
    // Allows removing drinks without phpMyAdmin
    drinkRemove: function(msg, drinkItem) {
        const errText = `Yeah....no dice. My eraser went missing, ${msg.author}. Ask me later and I'll remove **${drinkItem}**.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tblDrink} WHERE drinkItem = '${drinkItem}'`, function(err, results) {
                    if (err != null || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Alrighty ${msg.author}, I won't tell members about **${drinkItem}** anymore.`);
                    }
                });
            }
            con.release();
        });
    },
    // Allows viewing the drink list without phpMyAdmin
    drinkList: function(msg) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'drinkItem';
        const descCol = 'drinkDesc';
        let response = `This is what I have for drinks, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tblDrink), function(err, results) {
                    if (err != null || results === false) {
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
    // returns a random food item
    getFood(msg) {
        pool.getConnection(function(err, con) {
            let greet, food, foodItem, foodDesc;
            con.query(selectQueryStr(tblGreet), function(err, results) {
                greet = getRandResult(results)['greet'];
            
                con.query(selectQueryStr(tblFood), function(err, results) {
                    food = getRandResult(results);
                    foodItem = food['foodItem'];
                    foodDesc = food["foodDesc"];
                    msg.channel.send(`${greet} ${msg.author}, I'll whip you up a ${foodItem}. It's made with ${foodDesc}.`);
                });
            });
            con.release();
        });
    },
    // Allows adding food without phpMyAdmin
    foodAdd: function(msg, foodItem, foodDesc) {
        const errText = `Hmm...my food menu has been misplaced. Can you try again later, ${msg.author}? , I'll add **${foodItem}** to it then.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`INSERT INTO ${tblFood} (foodItem, foodDesc) VALUES ('${foodItem}', '${foodDesc}')`, function(err, results) {
                    if (err != null || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Sounds tasty! I'll add **${foodItem}** to my menu right now, ${msg.author}.`);
                    }
                });
            }
            con.release();
        });
    },
    // Allows removing food without phpMyAdmin
    foodRemove: function(msg, foodItem) {
        const errText = `Yeah, I can't remove ${foodItem} right now. Try again later, ${msg.author}.`;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(`DELETE FROM ${tblFood} WHERE foodItem = '${foodItem}'`, function(err, results) {
                    if (err != null || results === false) {
                        errResponse(errText);
                    }
                    else {
                        msg.channel.send(`Well, if you insist, ${msg.author}, I'll remove **${foodItem}** from my menu.`);
                    }
                });
            }
            con.release();
        });
    },
    // Allows viewing the food list without phpMyAdmin
    foodList: function(msg) {
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, come back a bit later, ok?`;
        const itemCol = 'foodItem';
        const descCol = 'foodDesc';
        let response = `This is what I have for food recipes, ${msg.author}: `;
        pool.getConnection(function(err, con) {
            if (err != null) {
                errResponse(errText);
            }
            else {
                con.query(selectQueryStr(tblFood), function(err, results) {
                    if (err != null || results === false) {
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
    // Sets the roles based on the user's provided email; marks the email as in use
    setRoles: function(author, email) {
        // INCOMPLETE
        const errText = `Sorry, ${msg.author}, I can find my notepad right now, ask one of the INDE Staff, please.`;
        pool.getConnection(function(err, con) {
            let inUse = false;
            let roleList = [];
            if (err != null) {
                author.send(errText);
            }
            for (let i = 0; i < tblsRoles; i++) {
                let tbl = tblsRoles[i];
                con.query(`SELECT * FROM ${tbl} WHERE email=${email}`), function(err, results) {
                    if (results.length > 0) {
                        if (results['inUse'] === author) {
                            let role = result['roleName'];
                            roleList.push(role);
                        }
                        else
                        {
                            inUse = true;
                        }
                    }
                }
            }            
            if (inUse) {
                author.send(`Hate to break it to you, ${author}, but your email is already in use by someone else.`)
            }
            else if (roleList.length > 0) {
                for (let i = 0; i < roleList.length; i++) {   
                    author.setRoles(roleList[i]);
                }
                for (let i = 0; i < tblsRoles; i++) {
                    con.query(`UPDATE ${tbl} SET inUse = '${author} WHERE email='${email}'`);
                }
                author.send(`Hey ${author}, thanks for your support! You've been added to the following role(s): ${roleList.join(', ')}`);
            }
            else {
                author.send(`I'm sorry, ${author} you are not currently in our records. If you feel this is an error, please speak with the INDE staff.`);
            }
            con.release();
        });
    },
};