// server/index.js

const express = require("express");
const cors = require('cors')
const app = express();
const db = require('./config/db')
const multer = require("multer");
const fs = require("fs");
const { throws } = require("assert");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

app.get("/riwayat", (req, res) => {
    db.query("SELECT riwayat.id AS id_riwayat, tanggal, pengguna, nama, hasil FROM riwayat, dna_disease WHERE riwayat.id_penyakit = dna_disease.id", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// SERVER FOR tesdna
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

function border(pattern){
    const result = [];
    result[0] = 0;

    let pattern_length = pattern.length;
    let i = 1; //suffix pointer
    let j = 0; //prefix pointer

    while(i < pattern_length-1){
        if(pattern.charAt(j) == pattern.charAt(i)){
            result[i] = j+1;
            i++;
            j++;
        }
        else if (j > 0){
            j = result[j-1];
        }
        else{
            result[i] = 0;
            i++;
        }
    }
    return result;
}

function kmpMatching(text, pattern){
    let text_length = text.length;
    let pattern_length = pattern.length;

    let borderValue = border(pattern);

    let i = 0; //text pointer
    let j = 0; //pattern pointer

    while(i < text_length){
        if (pattern.charAt(j) == text.charAt(i)){
            if(j == pattern_length-1){
                return i - pattern_length + 1;
            }
            i++;
            j++;
        }
        else if (j > 0){
            j = borderValue[j-1];
        }
        else{
            i++;
        }
    }
    return -1;
}

function lastOccurence(pattern){
    const result = [];
    for (let i = 0; i < pattern.length; i++){
        result[pattern.charAt(i)] = i;
    }
    return result;
}

function bmMatching(text, pattern){
    const last = lastOccurence(pattern);
    const text_length = text.length;
    const pattern_length = pattern.length;
    
    let i = pattern_length - 1;
    let j = pattern_length -1; //pattern pointer

    if(pattern_length > text_length){
        return -1;
    }

    do{
        if(pattern.charAt(j) == text.charAt(i)){
            if(j == 0){
                return i;
            }
            else{
                i--;
                j--;
            }
        }
        else{
            let l = last[text.charAt(j)];
            if(l == undefined){
                l = -1;
            }
            i = i + pattern_length - Math.min(l+1, j);
            j = pattern_length-1;
        }
    } while(i < text_length);

    return -1;
}



const upload = multer({storage}).single('file');
let fileName;
let content;
let namaPenyakit;
let namaPengguna;
let isTrue;
let aaa;


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err){
            return res.status(500).json(err);
        }
        
        fileName = req.file.filename;
        namaPengguna = req.body.pengguna;
        namaPenyakit = req.body.penyakit;
        algorithm = req.body.radio;
        content = fs.readFileSync("./public/" + fileName).toString();

        let regexCheck = content.match(/[ACTG]+/g)
        console.log(regexCheck)
        console.log("JALAN")
        if(regexCheck.length>1){
            let result = {
                nama: namaPengguna,
                penyakit: namaPenyakit,
                isTrue: "Data tidak sesuai"
            }
            return res.status(200).send(result)
        }
        else{
            db.query("SELECT * FROM dna_disease WHERE nama = '" + namaPenyakit +"'" , (err, rows, fields) =>{
                if (rows[0] == undefined){
                    isTrue = "Not Found"
                }
                else{
                    if(algorithm == "KMP"){
                        if(kmpMatching(content, rows[0].sequence_dna) != -1){
                            isTrue = "TRUE";
                            console.log("KMP");
                        }
                        else{
                            isTrue = "FALSE";
                        }
                    }
                    else{
                    if(bmMatching(content, rows[0].sequence_dna) != -1){
                        isTrue = "TRUE";
                        console.log("BM")
                    }
                    else{
                        isTrue = "FALSE";
                    }
                    }

                }
                let result = {
                    nama: namaPengguna,
                    penyakit: namaPenyakit,
                    isTrue: isTrue
                }
                let intHasil
                if(isTrue == "TRUE"){
                    intHasil = 1
                }
                else{
                    intHasil = 0
                }
                const d = new Date()
                let date = d.getFullYear().toString() + "-" + (d.getMonth()+1).toString() + "-" + d.getDate().toString();
                db.query("Insert into riwayat (id_penyakit, sequence_dna, tanggal, pengguna, hasil) values (" + rows[0].id + "," + "'" + rows[0].sequence_dna+ "'" +"," + "'" + date+ "'" + "," + "'" + namaPengguna+ "'"+","+ intHasil.toString() +")", (err, rows, fields) => {

                })

                return res.status(200).send(result);
            })
        }

    })
});