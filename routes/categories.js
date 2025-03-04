const express = require('express');
const router = express.Router();

// Express server-ийг хүсэлтэнд хариулдаг болгох
// route дээр JSON явуулж үзье.Тэгээд Postman дээр харъя
// app.get('/', (req,res) => {
//     res.status(500).send({
//         message:"Hello from express server!!!",
//         course:"Rest api backEnd"
//     })
// });
// route дээр JSON явуулж үзье.Хөгжүүлэгч өөрөө json явуулж байна гэдгээ код дээрээ мэдэгдье гэвэл
// router.get('/', (req,res) => {
//     res.status(200).json({
//         success:false,
//         error:"id is missing now",
       
//     })
// });
// route дээр бүх категоруудыг авах endpoint бичиж өгье.
router.get('/', (req,res) => {
    res.status(200).json({
        success:true,
        data:"Бүх категоруудыг энд өгнө.",
       
    })
});
// Ийм id-тай категорийг өгнө
router.get('/:getId', (req,res) => {
    res.status(200).send({
        success:true,
        data:`${req.params.getId} id-тай категорийн мэдээллийг өгнө.`
    })
})

// POST insert буюу шинэ категори үүсгэх
router.post('/', (req,res) => {
    res.status(200).json({
        success:true,
        data:"Шинэ категори үүсгэнэ."
    });

});
// PUT буюу тухайн id-тай категорийг өөрчилнө
router.put("/:id", (req,res) => {
    res.status(200).json({
        success:true,
        data:`Ийм ${req.params.id} ID-тай категорийг өөрчилнө`
    })
});

// Delete 
router.delete("/:kkk", (req,res) => {
    res.status(200).send({
        success:true,
        data:`${req.params.kkk} ID-тай категорийг устгана.`
    })
});

module.exports = router;