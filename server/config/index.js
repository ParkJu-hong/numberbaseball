const dotenv = require('dotenv');
dotenv.config();


const config = {
    development: {
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_PASSWORD,
        database: 'numberbaseball'
    },
    test: {
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_PASSWORD,
        database: 'numberbaseball'
    }
};

module.exports = config;