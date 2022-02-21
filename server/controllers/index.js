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

    let arr = new Array();
    
    const createNumber = (_arr) => {
        let tempValue = random.integer(1, 9);
        while(1){
            tempValue = random.integer(1, 9);
            if(!_arr.includes(tempValue)){
                return tempValue;
            };
        };
    };

    for(let i = 0; i < 5; i++){
        arr.push(createNumber(arr));
    };

    return Number(arr.join(''));
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

