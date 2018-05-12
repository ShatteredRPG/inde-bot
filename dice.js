
module.exports = {
    mds: function(msg, args) {
        var modSign = '';
            var rawArg = args[0];
            var newArg = '';
            var rating = 0;
            var mod = 0;
            var modMult = 1;

            if (rawArg.includes('-')) {
                modSign = '-';
                modMult = -1;
            }
            else if (rawArg.includes('+')) {
                modSign = '+';
            }

            if (modSign !== '') {
                newArg = rawArg.split(modSign);
                rating = newArg[0];
                mod = newArg[1] * modMult;
            }
            else {
                rating = rawArg;
            }
            
            var d10c = Math.floor(rating / 4);
            var d8c = Math.floor( (rating % 4) / (rating % 4 + 1) + .25);
            var d6c = Math.floor( (rating % 4) / (rating % 4 + 1) + .45);
            var d4c = Math.floor( (rating % 4) / (rating % 4 + 1) + .50);
            if (d8c > 0) {
                d6c = 0;
                d4c = 0;
            }
            else if (d6c > 0) {
                d4c = 0;
            }      

            var d10r = rollMultiple(d10c, 1, 10);
            var d8r = rollMultiple(d8c, 1, 8);
            var d6r = rollMultiple(d6c, 1, 6);
            var d4r = rollMultiple(d4c, 1, 4);

            //msg.channel.send(`${msg.author} rolled Rating **${rating}** (${d10c}d10+${d8c}d8+${d6c}d6+${d4c}d4${modSign}${mod}) = **${result}**`)
            msg.channel.send(concatRoll(msg.author, rating, d10r, d8r, d6r, d4r, modSign, mod));
    }
  };

// Concats the MDS roll
function concatRoll(author, rating, d10r, d8r, d6r, d4r, modSign, mod)
{
    var str = `${author} rolled MDS Rating **${rating}** (`;
    var resultStr = '';
    var result = 0;
    if (d10r['count'] > 0) {
        str += `${d10r['count']}d10+`;
        resultStr += `(${d10r['rolls'].join('+')})+`;
        for (var i = 0; i < d10r['rolls'].length; i++) {
            result += d10r['rolls'][i];
        }
    }
    if (d8r['count'] > 0) {
        str += `${d8r['count']}d8+`;
        resultStr += `(${d8r['rolls'].join('+')})+`;
        for (var i = 0; i < d8r['rolls'].length; i++) {
            result += d8r['rolls'][i];
        }
    }
    if (d6r['count'] > 0) {
        str += `${d6r['count']}d6+`;
        resultStr += `(${d6r['rolls'].join('+')})+`;
        for (var i = 0; i < d6r['rolls'].length; i++) {
            result += d6r['rolls'][i];
        }
    }
    if (d4r['count'] > 0) {
        str += `${d4r['count']}d4`;
        resultStr += `(${d4r['rolls'].join('+')})+`;
        for (var i = 0; i < d4r['rolls'].length; i++) {
            result += d4r['rolls'][i];
        }
    }
    if (str.endsWith('+')) {
        str = str.slice(0, -1);
    }
    if (resultStr.endsWith('+')) {
        resultStr = resultStr.slice(0, -1);
    }
    if (mod !== 0) {
        if (mod > 0) {
            str += modSign + mod;
            resultStr += modSign + mod;
        }
        else {
            str += mod;
            resultStr += mod;        
        }
        result += mod;
    }
    str += `) = *[${resultStr}]* = **${result}**`;
    return str;
}

function dieRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollMultiple(count, min, max) {
    var result = 0;
    var arr = [];
    for (var i = 0; i < count; i++) {
        var roll = dieRoll(min, max);
        result += roll;
        arr.push(roll);
    }
    var resultObj = {
        'count': count,
        'dieCode': max,
        'result': result,
        'rolls': arr
    }
    return resultObj;
}