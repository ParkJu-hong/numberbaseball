const models = require('../models');
// var CryptoJS = require("crypto-js");
const { Random, MersenneTwister19937 } = require('random-js');
const async = require('async');


function createDBdecryptionKey(key) {
    models.insertDecryptionKey(() => { }, key);
}

function preReadDBdecryptionKey(){
    let result;
    return models.testfunction((err, _result) => {
        result = _result[0].DECRYPTION_KEY;
        return result;
    });
}

function readDBdecryptionKey() {
    return new Promise((resolve, reject) => {
        let result;
        models.testfunction((err, _result) => {
            result = _result[0].DECRYPTION_KEY;

            if (err) {
                reject(err);
            } else {
                resolve(result);
            };
        });
    });
}
function deleteDBdecryptionKey(key) {
    models.deleteDecryptionKey(() => { }, key);
}

function compare(secret, guess) {
    let s = 0;
    let b = 0;
    for (let i = 0; i < secret.length; i++) {
        for (let j = 0; j < guess.length; j++) {
            if (secret[i] === guess[j] && i === j) s++;
            else if (secret[i] === guess[j]) b++;
        }
    }
    if (`${s}S${b}B` === '0S1B') return `${s}S${b}B` + ' ' + '4OUT'
    return `${s}S${b}B`;
}

function mersenneTwister19937(key) {
    const random = new Random(MersenneTwister19937.seed(key));

    let arr = new Array();

    const createNumber = (_arr) => {
        let tempValue = random.integer(1, 9);
        while (1) {
            tempValue = random.integer(1, 9);
            if (!_arr.includes(tempValue)) {
                return tempValue;
            };
        };
    };

    for (let i = 0; i < 5; i++) {
        arr.push(createNumber(arr));
    };

    return Number(arr.join(''));
}

module.exports = {
    testController: (req, res) =>{
        // yarn workspace server add async

        res.json({result: 'OK'})
    },
    createRandumNumber: (req, res) => {
        deleteDBdecryptionKey();
        let key = Math.floor(Math.random() * 10000);
        createDBdecryptionKey(key);

        res.json({ result: 'Ok start' });
    },
    isitRightNumber: (req, res) => {
        console.log('preReadDBdecryptionKey() : ', preReadDBdecryptionKey());

        readDBdecryptionKey().then(key => {
            // console.log('key : ', key);
            const guess = req.body.answer;
            const secret = mersenneTwister19937(key);
            console.log('정답 : ', secret);

            res.json({ result: compare(secret.toString(), guess.toString()) });
        }).catch(err => {
            console.error(err);
            res.json({ result: false });
        });

    },
    deleteRandumNumber: (req, res) => {
        deleteDBdecryptionKey();
        res.json({ data: 'Successfully delete' });
    }
}

/*
readDBdecryptionKey2((err, result) => {
    if (err) {
        console.error(err);
        res.json({ result: false });
    } else {
        const guess = req.body.answer;
        const secret = mersenneTwister19937(result);
        console.log('정답 : ', secret);
        res.json({ result: compare(secret.toString(), guess.toString()) });
    }
});
*/

/*
function preReadDBdecryptionKey(){
    let result;
    models.testfunction((err, _result) => {
        result = _result[0].DECRYPTION_KEY;
    });
    return result;
}
*/
/*
function readDBdecryptionKey2(callback) {
    let result;
    models.testfunction((err, _result) => {
        result = _result[0].DECRYPTION_KEY;

        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}
*/
