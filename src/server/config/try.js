const db = require('./db')

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO sequence_dna (Nama, Sequence) VALUES ('Unknown', 'GTCGTTCGGACACCATCTAT')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});