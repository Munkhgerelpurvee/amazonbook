const express = require('express');
const dotenv = require('dotenv');

// Аппын тохиргоог process.env - рүү ачаалах
dotenv.config({path: "./config/config.env"});

const app = express();
// Express server-ийг хүсэлтэнд хариулдаг болгох
// route дээр JSON явуулж үзье.Тэгээд Postman дээр харъя
// app.get('/', (req,res) => {
//     res.status(500).send({
//         message:"Hello from express server!!!",
//         course:"Rest api backEnd"
//     })
// });
// route дээр JSON явуулж үзье.Хөгжүүлэгч өөрөө json явуулж байна гэдгээ код дээрээ мэдэгдье гэвэл
app.get('/', (req,res) => {
    res.status(200).json({
        success:false,
        error:"id is missing now",
       
    })
});
// route дээр бүх категоруудыг авах endpoint бичиж өгье.
app.get('/api/v1/categories', (req,res) => {
    res.status(200).json({
        success:true,
        data:"Бүх категоруудыг энд өгнө.",
       
    })
});
// Ийм id-тай категорийг өгнө
app.get('/api/v1/categories/:getId', (req,res) => {
    res.status(200).send({
        success:true,
        data:`${req.params.getId} id-тай категорийн мэдээллийг өгнө.`
    })
})

// POST insert буюу шинэ категори үүсгэх
app.post('/api/v1/categories', (req,res) => {
    res.status(200).json({
        success:true,
        data:"Шинэ категори үүсгэнэ."
    });

});
// PUT буюу тухайн id-тай категорийг өөрчилнө
app.put("/api/v1/categories/:id", (req,res) => {
    res.status(200).json({
        success:true,
        data:`Ийм ${req.params.id} ID-тай категорийг өөрчилнө`
    })
});

// Delete 
app.delete("/api/v1/categories/:kkk", (req,res) => {
    res.status(200).send({
        success:true,
        data:`${req.params.kkk} ID-тай категорийг устгана.`
    })
})

app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `));

    /*
      Дараагийн буюу lesson18-аар одоогоор ганцхан categories гэдэг Resource-тай өнөөдөр ажиллахад зүгээр энгийн текст хариу буцаасан байхад маш урт код болж байна. Тиймээс дараагийн хичээлээр database-тэй холбогдоод, security code нэмэгдээд мөн эрх шалгаад ирэх юм бол код цааш маш урт болох тул тусдаа controller гаргаж ирж хийх болно.
    */
