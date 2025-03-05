// node.js-ийн өөрийн library 
const express = require('express');
const dotenv = require('dotenv');

// core library -ийг өөрсдийн бичсэн кодны дээр нь тавьж өгнө
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream') // version 2.x
// npm -ийн library
var morgan = require('morgan');


// хамгийн сүүлд бидний өөрсдийн бичсэн library орж ирнэ гэсэн ийм дарааллаар import хийж өгвөл зүгээр байдаг байгаа.
const logger = require("./middleware/logger.middleware");



// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");

// Аппын тохиргоог process.env - рүү ачаалах
dotenv.config({path: "./config/config.env"});

/*

create a write stream (in append mode) Файлын систем рүү бичих суваг үүсгэж байна. 

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

Хаана бичих юм бэ? гэвэл 'access.log' --- гэсэн файл руу бичиж байна.


Энэ __dirname гэдэг бол node.js-ийн өөрийнх нь тогтмол хувьсагч байгаа. Энэ нь систем дээр яг одоо ямар зам дээр байна вэ? гэдгийг харуулдаг байгаа. 
console.log(__dirname);
// C:\Users\admin\OneDrive\Desktop\amazon-api

path.join--- гэдэг функц нь энэ C:\Users\admin\OneDrive\Desktop\amazon-api энэ замыг аваад хойноос нь 'access.log' --- гэдэг нэрийг залгачихаж байна гэсэн үг юм. Ингэж залгахад amazon-api__access.log гэсэн бүтэн зам болж байна. Тэгвэл энэ бүтэн зам дээр { flags: 'a' }); энэ буюу flags дээр нь а --- гэж дамжуулахаар append буюу энэ файл руу хойноос нь залгаад, залгаад, залгаад байж болдог тийм string үүсгэ гэж байгаа юм. log --- нь угаасаа хүсэлт орж ирэх болгонд энэ файлын контент руу нь залгаад л бичээд байна. Тийм string үүсгээд түүнийгээ  accessLogStream гэж нэрлэсэн байна. 



*/

console.log(__dirname);
// create a write stream (in append mode) Файлын систем рүү бичих суваг үүсгэж байна. 
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });



// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

const app = express();

// logger middleware 
app.use(logger);

// morgan middleware
app.use(morgan('combined', { stream: accessLogStream }));


// middleware ашиглан route-ийг app confonent-той хоблож өгөх
app.use("/api/v1/categories", categoriesRoutes);


app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `));

   
