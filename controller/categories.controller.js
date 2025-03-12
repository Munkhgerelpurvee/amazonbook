const CategoryModel = require("../models/categories.model")
// Бүх категорийг гаргаж өгдөг контроллер функц мөн бид бүх функцээ middleware хэлбэрээр бичнэ. middleware function нь requist, response, next гэсэн 3 parameters хүлээн авдаг.  middleware бол гурван аргументтай энгийн функц юм.

exports.getCategories = async (req, res, next) => {
    try{
        const allCategories = await CategoryModel.find();
        res.status(200).json({
            success:true,
            data:allCategories,
           
        })
    } catch(err) {
      next(err);
    }

};

exports.getCategory = async (req, res, next) => {
    try{
        const oneCategory = await CategoryModel.findById(req.params.id);


/*
lesson29 express-n doc дээр ингэж өгсөн байдаг.Хэрвээ алдаа гарах юм бол та алдааг нь next(err) ингэж next() гэдэг функцэд бичээд дамжуулаарай. Ингэх юм бол exprtess library маань алдаа үүссэн гэдгийг мэдээд зохих алдааны мэдээллийг өгдөг байна. 
try {

} catch(err) {
       next(err)

    }

    Үүнийг getCategories функц дээр бичиж өгөөд одоо postman дээр дуудаж үзье.
{
    "success": false,
    "error": "67d0de03ca76d9d06998ba05id-тай категори АЛГА байна."
} ингэж хариу ирсэh буюу  next(err) --- дээр алдааг барьж аваад ингэж буцаадаг болгоё. middleware дотор error.middleware.js file нээгээд дотор нь 
errorHandler--- буюу алдааг боловсруулагч гэдэг нэртэй функц нь 4 аргументтай байх ёстой байдаг. 

Одоо бүх controller-iin catch(err) {
next(err)
} болгож өөрчилье.

*/

        if(!oneCategory) {
           return res.status(400).send({
                success:false,
                error: req.params.id + "id-тай категори АЛГА байна.",
                
            });
            
        };
        res.status(200).send({
            success:true,
            data:oneCategory
        })
        
    } catch(err) {
       next(err);
    //    Алдаа үүссэн бол дараагийн middleware-ийг дууд буюу errorHandler -middleware-ийг дуудна.

    }
};


exports.createCategory = async  (req, res, next) => {
    console.log("DATA requist.body: ", req.body);
    // database-д үүссэн категори categotyAtlas---д ороод ирнэ. 
    try {

        const categoryAtlas = await CategoryModel.create(req.body);
             res.status(200).json({
                 success:true,
                 data:categoryAtlas
             });

    } catch(err) {
      next(err);

    }
};

exports.updateCategory = async (req, res, next) => {

    try{

        const upCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        if(!upCategory) {
          return  res.status(400).send({
                success:false,
                error: req.params.id + "id-тай категори АЛГА.",

            })
        };
        res.status(200).json({
            success:true,
            data:upCategory
        })

    } catch(err) {
       next(err);
    }
};

exports.deleteCategory = async(req, res, next) => {

    try{
        const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!delCategory) {
            return res.status(400).send({
                 success:false,
                 error: req.params.id + "id-тай категори АЛГА тул устгаж чадсангүй.",
                 
             });
             
         };
    
        res.status(200).send({
            success:true,
            data:req.params.id + "id-тай категорийг амжилттай устгалаа."
        })

    } catch(err) {
      next(err);

    }
}
