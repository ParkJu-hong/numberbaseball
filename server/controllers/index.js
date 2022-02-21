const models = require('../models');
// var CryptoJS = require("crypto-js");
const { Random, MersenneTwister19937 } = require('random-js');

function compare(secret, guess) {
    var bulls = 0;
    var cows = 0;
    var numbers = new Array(10);
    for (var i = 0; i < 10; i++) {
        numbers[i] = 0;
    }
    for (var i = 0; i < secret.length; i++) {
        var s = secret.charCodeAt(i) - 48;
        var g = guess.charCodeAt(i) - 48;
        if (s == g) bulls++;
        else {
            if (numbers[s] < 0) cows++;
            if (numbers[g] > 0) cows++;
            numbers[s]++;
            numbers[g]--;
        }
    }
    return bulls + "S" + cows + "B";
}

function mersenneTwister19937(key){
    const random = new Random(MersenneTwister19937.seed(key));

    const v1 = random.integer(1, 9);
    let v2 = random.integer(1, 9);
    while (v1 === v2) {
        v2 = random.integer(1, 9);
    }
    let v3 = random.integer(1, 9);
    while (v1 === v3 || v2 === v3) {
        v3 = random.integer(1, 9);
    }

    const secret = v1 * 100 + v2 * 10 + v3; 
    return secret;
}

module.exports = {
    createRandumNumber: (req, res) => {
        const key = req.query.key;

        const secret = mersenneTwister19937(key);

        console.log('정답 : ', secret);

        res.json({ result: 'Ok start' });
    },
    isitRightNumber: (req, res) => {
        const key = req.query.key;
        const guess = req.body.answer;

        const secret = mersenneTwister19937(key);

        const secretString = secret.toString();
        const guessString = guess.toString();

        let count = compare(secretString, guessString);
        
        res.json({ result: count });
    }
}

