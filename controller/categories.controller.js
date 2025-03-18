const CategoryModel = require("../models/categories.model")
// Бүх категорийг гаргаж өгдөг контроллер функц мөн бид бүх функцээ middleware хэлбэрээр бичнэ. middleware function нь requist, response, next гэсэн 3 parameters хүлээн авдаг.  middleware бол гурван аргументтай энгийн функц юм.
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler.middleware")


exports.getCategories = asyncHandler(async (req, res, next) => {
        console.log(req.query);
        
        const allCategories = await CategoryModel.find(req.query);
        res.status(200).json({
            success:true,
            data:allCategories,
           
        })
 

});

exports.getCategory = asyncHandler(async (req, res, next) => {

        const oneCategory = await CategoryModel.findById(req.params.id);

        if(!oneCategory) {

            throw new MyError(req.params.id + " id-тай категори АЛГА гэж asyncHandler-аар дамжуулж байна.", 400)
            
        };
        res.status(200).send({
            success:true,
            data:oneCategory
        }) 
});


exports.createCategory = asyncHandler(async (req, res, next) => {
        console.log("DATA requist.body: ", req.body);
        // database-д үүссэн категори categotyAtlas---д ороод ирнэ. 
    
            const categoryAtlas = await CategoryModel.create(req.body);
                 res.status(200).json({
                     success:true,
                     data:categoryAtlas
                 });  
    }); 


    exports.updateCategory = asyncHandler(async (req, res, next) => {
    
            const upCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
                new:true,
                runValidators:true
            });
    
            if(!upCategory) {
                throw new MyError(req.params.id + "id-тай категори АЛГА байгаад өөрчилж чадаагүй ШҮҮ!!!.", 400)
            
            };
            res.status(200).json({
                success:true,
                data:upCategory
            });
    }


) 

exports.deleteCategory =asyncHandler(async(req, res, next) => {

        const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!delCategory) {
            throw new MyError(req.params.id + "id-тай категори АЛГА байгаад устгаж чадаагүй ШҮҮ!!!.", 400)
             
         };
    
        res.status(200).send({
            success:true,
            data:req.params.id + "id-тай категорийг амжилттай устгалаа."
        })
});


/*

Lesson32 Өнөөдрийн хичээлээр controller дотор олон энд тэндгүй яваад байгаа try{} catch(err) {} ---эмхлээд asyncHandler гэдэг өөрсдийн бичсэн middleware дотор оруулж өгнө. Ингэснээр controller-ийн код маань илүү эмх цэгцтэй жижигхэн болж харагдах юм.

exports.deleteCategory = async(req, res, next) => {

    try{
        const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!delCategory) {
            throw new MyError(req.params.id + "id-тай категори АЛГА байгаад устгаж чадаагүй ШҮҮ!!!.", 400)
             
         };
    
        res.status(200).send({
            success:true,
            data:req.params.id + "id-тай категорийг амжилттай устгалаа."
        })

    } catch(err) {
      next(err);

    }
}

try{} catch(err) {} --- гэдэг нь бүх газар адилхан байгаад байна. Үүнийг бид автоматжуулж болно гэсэн үг. Цаад санаа нь бол энэ функц нь цаанаа 

exports.deleteCategory = async(req, res, next) => {
        const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!delCategory) {
            throw new MyError(req.params.id + "id-тай категори АЛГА байгаад устгаж чадаагүй ШҮҮ!!!.", 400)
             
         };
    
        res.status(200).send({
            success:true,
            data:req.params.id + "id-тай категорийг амжилттай устгалаа."
        })
} үүнийг хийдэг deleteCategory нь аргументаараа       const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!delCategory) {
            throw new MyError(req.params.id + "id-тай категори АЛГА байгаад устгаж чадаагүй ШҮҮ!!!.", 400)
             
         };
    
        res.status(200).send({
            success:true,
            data:req.params.id + "id-тай категорийг амжилттай устгалаа."
        }) үүнийг хийдэг энэ функцийг аргументаараа хүлээж аваад энэ функцийг try{} catch(err) {} дотор ажиллуулаад хэрвээ алдаа гараад ирэх юм бол catch-ээр нь барьж аваад бидний өмнөөс аргументаар орж ирж буй доторх next-функцийг дуудаад өгдөг тийм middleware байхад болчихно.Бид тэр middleware-ээ asyncHandler --- гэдэг нэртэй гээд үзчихье. asyncHandler чинь middleware юм чинь nst delCategory - гэдэг дээр энэ middleware-ийг буюу syncHandler функцийг  шууд холбочихож болно.  


        Тэгвэл энэ аyncHandler функцийг  тэгвэл яаж бичих вэ?
      аyncHandler гэдэг middleware үүсгээд : 
      
Доторх код нь:
      const asyncHandler = (fn)=> (req,res,next) => 
    Promise.resolve(fn(req,res,next)).catch(next);

     module.exports = asyncHandler;

     const asyncHandler функц нь аргументаараа ямар нэгэн функц хүлээж авна. Тэр аргументаар орж ирж буй (fn) функц нь цаанаа бас аргументаараа "3" аргумент хүлээж авч байгаа. Манай delCategory getCategory ---зэрэг бүх controller---ийн функцүүд маань бүгдээрээ promise буцааж байгаа буюу ӨХ async функцүүд тэр promise---ийг нь ажиллуулна гэсэн үг юм. promise-ийг нь Promise.resolve() гэдэг функцийг нь дуудаад ажиллуулчихан. Ажиллуулахдаа (fn) функц нөгөө "3" аргумент-ттай нь дуудчихна. Ингэж дуудах үед exception манай (fn) функц дотроос шидэгдэх юм бол   Promise.resolve(fn(req,res,next)).catch(next); ингэж catch ---хийж аваад next рүүгээ дамжуулна.



     ийм байна. Энэ syncHandler функцийг хүмүүс ч гэсэн хийгээд үнэгүй байршуулсныг нь : expressjs asyncHandler gitHub --- гэж хэрхэн бичсэнийг олж үзээрэй.Мөн төсөл дээрээ суулгаж ажиллуулж үзэх бүрэн боломжтой.




*/