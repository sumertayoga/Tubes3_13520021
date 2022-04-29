# Tubes3_13520021

## Deskripsi Program
Sebuah aplikasi yang berbasis Web yang dapat mendeteksi seseorang terkena penyakit apa dengan menggunakan algoritma Pattern Matching. Adapun algoritma yang digunakan ada dua, yaitu Boyer-Moore dan Knuth-Morris-Pratt.

## Requirement program
Frontend : React
Backend : Node js Express
Database : MySQL
Berikut beberapa modul yang harus ada di setiap bagian.
FrontEnd:
- axios 0.27.2
- moment 2.29.3
- react-router-dom 5.3.1
- mysql 2.18.1

Backend:
- cors 2.8.5
- express 4.18.0
- multer 1.4.4
- mysql 2.18.1
- nodemon 2.0.15

Modul-modul tersebut dapat diinstal dengan menggunakan command npm install di direktori src/client dan src/server

```
$ cd src/client
$ npm install
```
dan
```
$ cd src/server
$ npm install
```

## Cara Menggunakan Program
Yang pertama harus dilakukan adalah merestore dump database yang ada di folder test ke mysql masing-masing. Kemudian menjalankan bagian frontend dengan menggunakan command npm start di direktori client dan menjalankan server atau backend dengan menggunakan command nodemon index / node index / npm start di direktori server.

```
$ cd src/client
$ npm start
```
dan
```
$ cd src/server
$ npm start
```

## Penggunaan Fitur
Menggunakan Fitur Tambah Penyakit:
- Klik add pada menu program
- Masukkan nama penyakit yang ingin ditambahkan
- Masukkan file txt yang berisi sequence DNA penyakit
- Klik tombol submit
- Jika terdapat pesan "Berhasil menambahkan ke dalam database" maka masukan telah berhasil dimasukkan ke dalam database
- Jika terdapat pesan "Error : {detail}" maka terdapat kesalahan dalam melakukan insert into database
- Jika terdapat pesan "Error : Input sequence dna tidak valid!" maka masukan file tidak valid

Menggunakan Fitur Tes DNA:
- Klik tesdna yang ada di bagian atas program
- Masukkan file yang berisi rantai DNA pengguna
- Masukkan nama pengguna
- Masukkan nama penyakit
- Klik tombol submit maka akan muncul hasil pengecekan
- Jika muncul keterangan data tidak sesuai maka isi file upload tidak sesuai misalnya karena mengandung karakter selain A,C,T,G, mengandung spasi maupun mengandung huruf kecil.
- Jika hasil pengecekan Not Found berarti masukan nama penyakit tidak ada di database

Menggunakan Fitur Riwayat:

## Author
| NIM      | Nama                        |
| -------- | --------------------------- |
| 13520021 | Gede Sumerta Yoga           |
| 13520106 | Roby Purnomo            | 
|  | Tri Sulton Adila                |
