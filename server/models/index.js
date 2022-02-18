const db = require("../db");

module.exports = {
    testfunction: (callback) => {
        const queryString = `SELECT * FROM randumnumber`;
        db.query(queryString, (err, result) => {
            callback(err, result);
        })
        return;
    },
    insertDecryptionKey: (callback ,decryptionKey) => {
        const queryString = `INSERT (DECRYPTION_KEY) VALUES (${decryptionKey})`;
        db.query(queryString, (err, result) => {
            callback(err, result);
        })
    },
    testIsItRight: (callback) => {
        const queryString = `SELECT * FROM randumnumber WHERE `;
        db.query(queryString, (err, result) => {
            callback(err, result);
        }) 
    }
}