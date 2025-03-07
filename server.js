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

// logger middleware 
app.use(logger);

// morgan middleware
app.use(morgan('combined', { stream: accessLogStream }));


// middleware ашиглан route-ийг app confonent-той хоблож өгөх
app.use("/api/v1/categories", categoriesRoutes);


const server = app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `));


// Бүх алдааг нэгдсэн нэг газар барьж авах
/*
"Unhandled Rejection" = "Баригдаагүй татгалзалт" эсвэл "Баригдаагүй амжилтгүй болсон Promise" гэж ойлгож болно. Unhandled Rejection = "Алдааг барилгүй орхисон", "шийдээгүй алдаа", "анхаараагүй алдаа" гэж монголоор ойлгож болно.

*/
process.on("unhandledRejection", (err, promise) => {
console.log(`Алдаа гарлаа: ${err.message}`);
server.close(() => {
  process.exit(1);
})
})
