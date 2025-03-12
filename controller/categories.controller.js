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

        res.status(400).send( {
            success:false,
                error:err,

        });

    }

};

exports.getCategory = async (req, res, next) => {
    try{
        const oneCategory = await CategoryModel.findById(req.params.id);
// if else гэхгүйгээр илүү товчхон буюу ганц шалгалттай болгох боломж байна.

/*
if(!oneCategory) хэрвээ категори маань null байх юм бол !oneCategory--true болж хувирна. ӨХ категори байхгүй тохиолдолд энэ хэсэг ажиллана. id-тай категори АЛГА байгаа тохиолдолд байхгүй гэж хэлээд энэ функцийн үйл ажиллагааг дуусгах хэрэгтэй. Үүний тулд return тавьж өгнө. 


null бол үнэний шалгуур (truthy/falsy) дээр "худал" (false) гэж тооцогддог.
🔹 ! (нот (negation)) оператор нь тухайн утгын эсрэг (inverse) утгыг гаргадаг.
🔹 null нь false гэж тооцогдох тул, !null нь true болно.
null нь "falsy" (худал) утга тул
!null нь үүний эсрэг утга буюу "true" болно.

6. Дүгнэлт
null нь "falsy" тул !null нь true болно.
if (!oneCategory) нь oneCategory байхгүй (null эсвэл undefined) үед ажиллана.
Энэ нь категори олдохгүй бол 400 алдаа буцаах механизмыг хангаж байна.
Товчхондоо: if (!oneCategory) шалгалт нь категори байхгүй үед (null бол) "үнэн" болно гэсэн утгатай. 🚀

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
        res.status(400).send({
            success:false,
            error:err

        });

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
