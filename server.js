// node.js-ийн өөрийн library 
const express = require('express');
const dotenv = require('dotenv');

// core library -ийг өөрсдийн бичсэн кодны дээр нь тавьж өгнө
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream') // version 2.x
// npm -ийн library
var morgan = require('morgan');
const  connectDB = require("./config/db");
const colors = require("colors");


// Аппын тохиргоог process.env - рүү ачаалах
dotenv.config({path: "./config/config.env"});

connectDB();


// хамгийн сүүлд бидний өөрсдийн бичсэн library орж ирнэ гэсэн ийм дарааллаар import хийж өгвөл зүгээр байдаг байгаа.
const logger = require("./middleware/logger.middleware");



// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");



console.log(__dirname);
// create a write stream (in append mode) Файлын систем рүү бичих суваг үүсгэж байна. 
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });



// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

const app = express();
// body parser 

/*
app.use(express.json()); энэ requist обьектоор орж ирсэн message болгоны body-хэсгийг нь шалгаад тэр өгөгдөл нь хэрвээ JSON өгөгдөл байх юм бол түүнийг requist -ийн body гэдэг хувьсагч дотор хийгээд өгөөрэй гэсэн утга илэрхийлнэ. 
Тэгэхээр ингэж console.log("DATA: ", req.body); харах боломжтой болох байгаа.
exports.createCategory = (req, res, next) => {
    console.log("DATA requist.body: ", req.body);
    res.status(200).json({
        success:true,
        data:"Шинэ категори үүсгэнэ..."
    });
}; энд үүнийг хааж байгаад // app.use(express.json()); postman дээр post хүсэлт илгээхэд console дээр:

C:\Users\admin\OneDrive\Desktop\amazon-api
Express server: 8000 порт дээр аслаа ... 
mongoDB холбогдлоо : amazon-shard-00-02.ai79y.mongodb.net
express deprecated req.host: Use req.hostname instead middleware\logger.middleware.js:110:56
POST http://localhost/api/v1/categories
DATA requist.body:  undefined байна. Харин одоо app.use(express.json()); --- үүнийг нээж байгаад postman дээр post хүсэлт илгээж ажиллуулахад :

C:\Users\admin\OneDrive\Desktop\amazon-api
Express server: 8000 порт дээр аслаа ... 
mongoDB холбогдлоо : amazon-shard-00-00.ai79y.mongodb.net
express deprecated req.host: Use req.hostname instead middleware\logger.middleware.js:110:56
POST http://localhost/api/v1/categories
DATA requist.body:  { name: 'Уран зохиол' } гэж console дээр ирж байна. 
*/
app.use(express.json());

// logger middleware 
app.use(logger);

// morgan middleware
app.use(morgan('combined', { stream: accessLogStream }));


// middleware ашиглан route-ийг app confonent-той хоблож өгөх
app.use("/api/v1/categories", categoriesRoutes);


const server = app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `.red));


// Бүх алдааг нэгдсэн нэг газар барьж авах
/*
"Unhandled Rejection" = "Баригдаагүй татгалзалт" эсвэл "Баригдаагүй амжилтгүй болсон Promise" гэж ойлгож болно. Unhandled Rejection = "Алдааг барилгүй орхисон", "шийдээгүй алдаа", "анхаараагүй алдаа" гэж монголоор ойлгож болно.

*/
process.on("unhandledRejection", (err, promise) => {
console.log(`Алдаа гарлаа: ${err.message}`.cyan.underline.bold);
server.close(() => {
  process.exit(1);
})
})
