const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'numberbaseball'
    }
)

con.connect((error) => {
    if (error) throw error;
})

module.exports = con;