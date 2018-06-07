module.exports = {
     // returns a reandom integer between two values
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // checks if a user has an approved group
    isAllowed: function(user) {
        const { allowedGroups } = require('./config.json');

        for (let i = 0; i < allowedGroups.length; i++) {
            if (user.roles.find('name', allowedGroups[i])) {
                return true;
            }
        }
        return false;
    },
};