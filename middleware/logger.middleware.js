/*
Middleware-ийг тусдаа folder дотор бичиж өгдөг байгаа. logger middleware маань ямар ч хүсэлт явуулсан бүгдийг ингэж барьж авч console дээр харуулах юм байна. logger middleware --- хөгжүүлэлт хийж байхад яг ямар application-аас орж гараад яг ямар хүсэлт явуулаад байгааг эндээсээ харна. Мөн зарим тохиолдолд алдаа гарах юм бол яг хаанаас ямар хүсэлтэнд алдаа гарсныг мөн хүсэлтүүд буруу орсон зэргийг энэ logger-оос харж болох байгаа.
DELETE http://localhost/api/v1/categories/888
GET http://localhost/api/v1/categories/888
PUT http://localhost/api/v1/categories/888
GET http://localhost/api/v1/categories/
*/
const logger = (req, res, next) => {
    /* requist дээр юм нэмдэг. Дараа нь бид хэн login хийснийг controller дотроос харж болно.


    exports.getCategories = (req, res, next) => {
    res.status(200).json({
        success:true,
        data:"Бүх категоруудыг энд өгнө...",
        user: req.userId,
       
    })

};
    

    postman дээр http://localhost:8000/api/v1/categories/ дуудахад {
    "success": true,
    "data": "Бүх категоруудыг энд өгнө...",
    "user": "FIJKHGSKDFGKLSDFNGV12323"
     }     ингэж userId --- харж болж байна. Үүнийг манай logger хийчихсэн манай controller руу logger moiddleware-ийн хийж өгсөн userId ороод ирчихсэн байна. Яг ийм байдлаар moiddleware-үүд хоорондоо requist-ээр өгөгдлөө хоорондоо бие биеэн рүүгээ дамжуулдаг байна. Эсвэл аюултай өгөгдөл байвал хасаж өгдөг байгаа. Магадгүй Hacker хийх гэж байгаа injection орж ирсэн бол тэдгээрийг илрүүлээд requist-ийн parameter-үүдээс цэвэрлэж өгдөг байгаа.

     server.js дээр манай logger middleware нь categoriesRoutes хийж өгсөн middleware-ийн дээр нь байгаа тул:
     
     categories.controller дотор userId-ийг хийж өгсөн байгаа. Хэрвээ доод талд нь бичиж өгсөн бол userId-нь   categories.controller дотор үүсэхгүй байсан байгаа. Тиймээс үнэхээр юм авмаар байгаа бол өгөх middleware-ийг нь өгөх middleware-ийнхээ дээр нь бичиж өгөх байгаа.

     // logger middleware 
       app.use(logger);

    // middleware ашиглан route-ийг app confonent-той хоблож өгөх
      app.use("/api/v1/categories", categoriesRoutes);



    */

      /*

      Одоо бид дараагийн Morgan logging middleware гэдэг мэргэжлийн middleware-ийг нь хэрэглэнэ. google search дээр Express morgan middleware гэж хайна.Хайгаад doc уншиж танилцана.
       https://github.com/expressjs/morgan

      morgan middleware суулганы дараа postman ажиллуулаад console дээр ингэж гарч ирсэн байна.
      POST http://localhost/api/v1/categories/  --- энэ нь манай бидний өөрсдийн бичсэн logger middleware байна. 
      POST /api/v1/categories/ 200 3.612 ms - 69 ---- morgam middleware 
       GET http://localhost/api/v1/categories/
       GET /api/v1/categories/ 200 0.619 ms - 110

Express server: 8000 порт дээр аслаа ... 
express deprecated req.host: Use req.hostname instead middleware\logger.middleware.js:55:56
GET http://localhost/api/v1/categories/456
GET /api/v1/categories/456 200 2.781 ms - 93


min-0:16 одоо morgan-middleware-ийг тусад нь файл руу loggin хийлгэж үзье.
    https://github.com/expressjs/morgan дотроос write logs to a file --- хэсгийг уншиж судална.
    var fs = require('fs')
var morgan = require('morgan')

Энэ бол node.js -ийн өөрийнх нь path library хэрэглэсэн байна. 
var path = require('path') Энэ path library  нь файлын системийн замтай ажиллах буюу файлын нэр, фолдерын нэр, замтай ажиллах функцүүдийг гаргаж өгдөг байгаа.

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// morgan middleware
app.use(morgan('combined', { stream: accessLogStream }));

Ингээд postman-ийг ажиллуулахад манайд access.log файл үүссэн байна.

::1 - - [05/Mar/2025:05:22:13 +0000] "GET /api/v1/categories/999 HTTP/1.1" 200 93 "-" "PostmanRuntime/7.43.0"
::1 - - [05/Mar/2025:05:24:42 +0000] "DELETE /api/v1/categories/999 HTTP/1.1" 200 78 "-" "PostmanRuntime/7.43.0"
::1 - - [05/Mar/2025:05:28:37 +0000] "PUT /api/v1/categories/999 HTTP/1.1" 200 87 "-" "PostmanRuntime/7.43.0"

Энэ нь жинхэнэ PRODUCTION server дээр энэ access.log файл маань байж байдаг бөгөөд server --- ажиллаж байгаад хэрэглэгчид гэнэт буруу ажиллаад байна гэвэл яг хэдэн цагийн үед хаана яасан ийсэн гэдгийг нь 

access.log файл дээрээ очоод харах боломжтой. Мэдээж нэг файлд олон өдрийн файл бичвэл аймаар урт файл үүснэ. Тэгэхээр ихэнэх тохиолдолд PRODUCTION SERVER тусдаа logs. гэсэн фолдер үүсгээд түүн дотроо өдөр өдрөөр log-файлуудыг нь хадгалдаг байгаа. 

Тийм болгоё гэвэл манай doc дээр log file rotation --- гээд хэсэг байна. 

https://github.com/expressjs/morgan

var express = require('express')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream') // version 2.x

var app = express()

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})


энэ байдлаар production server --- дээр log -ийг хийдэг байна. log -ийг хийх нь бидний гол зорилго биш харин middleware-ийг хэрхэн өөрөө бичих болон npmjs.org дээр байгаа"  гурав дахич  widdleware-ийг хэрхэн оруулж ирж ашиглах вэ? "
гэдгийг сурлаа.





      */
    req.userId = "FIJKHGSKDFGKLSDFNGV12323",
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
    next();
    };

    module.exports = logger;