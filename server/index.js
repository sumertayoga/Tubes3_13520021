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

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM posts", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM posts WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the post
app.post('/api/create', (req,res)=> {

const username = req.body.userName;
const title = req.body.title;
const text = req.body.text;

db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

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
        console.log(namaPengguna);
        namaPenyakit = req.body.penyakit;
        content = fs.readFileSync("./public/" + fileName).toString();


        
        db.query("SELECT * FROM dna_disease WHERE nama = '" + namaPenyakit +"'" , (err, rows, fields) =>{
            if (rows[0] == undefined){
                isTrue = "Not Found"
            }
            else{
                if(kmpMatching(content, rows[0].sequence_dna) != -1){
                    isTrue = "TRUE";
                }
                else{
                    isTrue = "FALSE";
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
            let date = d.getFullYear().toString() + "-" + d.getMonth().toString() + "-" + d.getDate().toString();
            db.query("Insert into riwayat (id_penyakit, sequence_dna, tanggal, pengguna, hasil) values (" + rows[0].id + "," + "'" + rows[0].sequence_dna+ "'" +"," + "'" + date+ "'" + "," + "'" + namaPengguna+ "'"+","+ intHasil.toString() +")", (err, rows, fields) => {

            })

            return res.status(200).send(result);
        })


    })
});