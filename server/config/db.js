const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "120131",
database: "dna",
port: "1234"
})

module.exports = db;