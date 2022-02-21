const models = require('../models');
// var CryptoJS = require("crypto-js");
const { Random, MersenneTwister19937 } = require('random-js');

function compare(secret, guess) {
    let s = 0;
    let b = 0;
    for(let i = 0; i < secret.length; i++){
        for(let j = 0; j < guess.length; j++){
            if(secret[i] === guess[j] && i === j) s++;
            else if(secret[i] === guess[j]) b++;
        }
    }

    return `${s}S${b}B`;
}

function mersenneTwister19937(key){
    const random = new Random(MersenneTwister19937.seed(key));


    // 이 부분도 배열로 바꿀 것 ?
    // 

    const v1 = random.integer(1, 9);
    let v2 = random.integer(1, 9);
    while (v1 === v2) {
        v2 = random.integer(1, 9);
    }
    let v3 = random.integer(1, 9);
    while (v1 === v3 || v2 === v3) {
        v3 = random.integer(1, 9);
    }
    let v4 = random.integer(1, 9);
    while (v4 === v3 || v4 === v2 || v4 === v1) {
        v4 = random.integer(1, 9);
    }
    let v5 = random.integer(1, 9);
    while (v5 === v4 || v5 === v3 || v5 === v2 || v5 === v1) {
        v5 = random.integer(1, 9);
    }
    

    const secret = v1 * 10000 + v2 * 1000 + v3 * 100 + v4 * 10 + v5 * 1; 
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

        let count = compare(secret.toString(), guess.toString());

        res.json({ result: count });
    }
}

