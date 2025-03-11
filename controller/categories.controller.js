const Category = require("../models/categories.model")
// Бүх категорийг гаргаж өгдөг контроллер функц мөн бид бүх функцээ middleware хэлбэрээр бичнэ. middleware function нь requist, response, next гэсэн 3 parameters хүлээн авдаг.  middleware бол гурван аргументтай энгийн функц юм.

exports.getCategories = (req, res, next) => {
    res.status(200).json({
        success:true,
        data:"Бүх категоруудыг энд өгнө...",
        user: req.userId,
       
    })

};

exports.getCategory = (req, res, next) => {
    res.status(200).send({
        success:true,
        data:`${req.params.id} id-тай категорийн мэдээллийг өгнө...`
    })
};


exports.createCategory = async  (req, res, next) => {
    console.log("DATA requist.body: ", req.body);
    // database-д үүссэн категори categotyAtlas---д ороод ирнэ. 
    try {

        const categoryAtlas = await Category.create(req.body);
             res.status(200).json({
                 success:true,
                 data:categoryAtlas
             });

    } catch(err) {
        res.status(400).send(
            {
                success:false,
                error:err,
            }
        )

    }
};

exports.updateCategory = (req, res, next) => {
    res.status(200).json({
        success:true,
        data:`Ийм ${req.params.id} ID-тай категорийг өөрчилнө...`
    })
};

exports.deleteCategory = (req, res, next) => {
    res.status(200).send({
        success:true,
        data:`${req.params.id} ID-тай категорийг устгана...`
    })
}
