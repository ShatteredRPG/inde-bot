# inde-bot

A bot for the INDE server based in the Shattered universe. To use this bot, rename default-config.json to config.json and fill in the relevant database details.

Change "default-config.json" to "config.json". It's done this way to avoid leaking INDE database information.


`CREATE DATABASE bot;
CREATE TABLE bot.t_greet (
    ID INT NOT NULL AUTO_INCREMENT,
    greet TEXT NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE bot.t_intro (
    ID INT NOT NULL AUTO_INCREMENT,
    intro TEXT NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE bot.t_outro (
    ID INT NOT NULL AUTO_INCREMENT,
    outro TEXT NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE bot.t_news (
    ID INT NOT NULL AUTO_INCREMENT,
    newsItem TEXT NOT NULL,
    newsDesc TEXT NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE bot.t_shatteredCore {
    ID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    roleName VARCHAR(255),
    PRIMARY KEY (ID)
);`