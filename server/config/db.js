const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Ngiauu-_-354m",
database: "dna",
})

module.exports = db;