const express = require('express');
const dotenv = require('dotenv');

// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");

// Аппын тохиргоог process.env - рүү ачаалах
dotenv.config({path: "./config/config.env"});

const app = express();
app.use("/api/v1/categories", categoriesRoutes);


app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `));

    /*
      Дараагийн буюу lesson18-аар одоогоор ганцхан categories гэдэг Resource-тай өнөөдөр ажиллахад зүгээр энгийн текст хариу буцаасан байхад маш урт код болж байна. Тиймээс дараагийн хичээлээр database-тэй холбогдоод, security code нэмэгдээд мөн эрх шалгаад ирэх юм бол код цааш маш урт болох тул тусдаа controller гаргаж ирж хийх болно.
    */
