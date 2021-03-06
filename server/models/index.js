const db = require("../db");

module.exports = {
    testfunction: (callback) => {
        const queryString = `SELECT * FROM randumnumber`;
        let realResult;
        db.query(queryString, (err, result) => {
            realResult = callback(err, result);
        });
        setTimeout(()=>{
            console.log('realResult one : ', realResult);
            return realResult;
        }, 1000)
    },
    insertDecryptionKey: (callback ,decryptionKey) => {
        const queryString = `INSERT INTO randumnumber(DECRYPTION_KEY) VALUES (${decryptionKey})`;
        db.query(queryString, (err, result) => {
            callback(err, result);
        })
    },
    deleteDecryptionKey: (callback) => {
        const queryString = `DELETE FROM randumnumber`;
        db.query(queryString, (err, result) => {
            callback(err, result);
        }) 
    }
}

/*
    DELETE FROM [테이블] WHERE [조건]으로 삭제할 것

*/