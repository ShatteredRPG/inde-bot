const diceEval = require('dice-expession-evaluator');

module.exports = {
    mds: function(msg, args) {
            let modSign = '';
            const rawArg = args[0];
            let newArg = '';
            let rating = 0;
            let mod = 0;
            let modMult = 1;

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
            const d10c = Math.floor(rating / 4);
            const d8c = Math.floor((rating % 4) / (rating % 4 + 1) + 0.25);
            let d6c = Math.floor((rating % 4) / (rating % 4 + 1) + 0.45);
            let d4c = Math.floor((rating % 4) / (rating % 4 + 1) + 0.50);
            if (d8c > 0) {
                d6c = 0;
                d4c = 0;
            }
            else if (d6c > 0) {
                d4c = 0;
            }

            const d10r = rollMultiple(d10c, 1, 10);
            const d8r = rollMultiple(d8c, 1, 8);
            const d6r = rollMultiple(d6c, 1, 6);
            const d4r = rollMultiple(d4c, 1, 4);

            msg.channel.send(concatRoll(msg.author, rating, d10r, d8r, d6r, d4r, modSign, mod));
    },
    dice: function(msg, args) {
        // I honestly don't have the brainpower to do this
    },
  };

// Concats the MDS roll
function concatRoll(author, rating, d10r, d8r, d6r, d4r, modSign, mod) {
    let str = `${author} rolled MDS Rating **${rating}** (`;
    let resultStr = '';
    let result = 0;
    if (d10r['count'] > 0) {
        str += `${d10r['count']}d10+`;
        resultStr += `(${d10r['rolls'].join('+')})+`;
        for (let i = 0; i < d10r['rolls'].length; i++) {
            result += d10r['rolls'][i];
        }
    }
    if (d8r['count'] > 0) {
        str += `${d8r['count']}d8+`;
        resultStr += `(${d8r['rolls'].join('+')})+`;
        for (let i = 0; i < d8r['rolls'].length; i++) {
            result += d8r['rolls'][i];
        }
    }
    if (d6r['count'] > 0) {
        str += `${d6r['count']}d6+`;
        resultStr += `(${d6r['rolls'].join('+')})+`;
        for (let i = 0; i < d6r['rolls'].length; i++) {
            result += d6r['rolls'][i];
        }
    }
    if (d4r['count'] > 0) {
        str += `${d4r['count']}d4`;
        resultStr += `(${d4r['rolls'].join('+')})+`;
        for (let i = 0; i < d4r['rolls'].length; i++) {
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
    let result = 0;
    const arr = [];
    for (let i = 0; i < count; i++) {
        const roll = dieRoll(min, max);
        result += roll;
        arr.push(roll);
    }
    const resultObj = {
        'count': count,
        'dieCode': max,
        'result': result,
        'rolls': arr,
    };
    return resultObj;
}