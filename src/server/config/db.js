const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Justplayit",
database: "dna",
})

module.exports = db;