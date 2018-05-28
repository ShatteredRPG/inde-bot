function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 module.exports = {
     //returns a reandom integer between two values
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    //checks if a user has an approved group
    isAllowed: function(user) {
        const { allowedGroups } = require('./config.json');

        for (var i = 0; i < allowedGroups.length; i++) {
            if (user.roles.find('name', allowedGroups[i])) {
                return true;
            }
        }
        return false;       
    }
}