const CategoryModel = require("../models/categories.model")
// Бүх категорийг гаргаж өгдөг контроллер функц мөн бид бүх функцээ middleware хэлбэрээр бичнэ. middleware function нь requist, response, next гэсэн 3 parameters хүлээн авдаг.  middleware бол гурван аргументтай энгийн функц юм.
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler.middleware")
//{{url}}/api/v1/categories?select=name slug averageRating&averageRating[$gt]=5
// {{url}}/api/v1/categories?select=name slug averageRating&averageRating[$gt]=5&sort=name
// {{url}}/api/v1/categories?select=name slug averageRating&averageRating[$gt]=5&sort=-name
// {{url}}/api/v1/categories?select=name slug averageRating averagePrice&averageRating[$gt]=5&sort=avaerageRating -averagePrice ---энд дундаж рэйтингээр шүүгээд адилхан 9 байвал давхар дундаж үнэ нь ихээсээ бага руу эрэмбэлэгдэхээр sort хийж байна.


exports.getCategories = asyncHandler(async (req, res, next) => {

    //     
    const page = parseInt(req.query.page) || 1;
    // delete req.query.page;
    // 
    const limit1 = parseInt(req.query.limit) || 100;
    // delete req.query.limit;

    // {{url}}/api/v1/categories?select=name slug&limit=2

    /*
    { page: '3', limit: '1' } name slug undefined console дээрээс харахад page and limit нь string ирж байна. Тиймээс тоо руу хөрвүүлэх хэрэгтэй.

    */
    // 

    const select = req.query.select;
    // delete req.query.select;
    // 
    const sort1 = req.query.sort;
    // delete req.query.sort;

    // Энэ олон req.query-ээс устгаад байгааг хялбар болгоё. Уётгах гээд байгаа зүйлүүдээ нэг массивт хийгээд давталт гүйлгээд устгачихна буюу нэг код болгож бичиж болно.


    ['page', 'limit', 'select', 'sort' ].forEach(el => delete req.query[el]
    );

    // Pagination тооцоолол
    const total = await CategoryModel.countDocuments();
    const pageCount = Math.ceil(total / limit1);
    const start = (page -1) * limit1 + 1;
    let end = (start + limit1) -1;
    if(end > total) end = total;

    // энэ pagination гэж обьект үүсгэе. Энэ обьект нь дараагийн болон өмнөх page-ийн талаарх мэдээллийг агуулдаг гэж үзье.Server талдаа ачаалал үүсгэхгүй гэж үзвэл энэ бүх хуудаслалтын тооцоог clint талдаа бүрэн хийж өгөх боломжтой байгаа.

    const pagination = {total, pageCount, start, end, limit1};
    if(page < pageCount) pagination.nextPage = page + 1;
    if(page > 1) pagination.prevPage = page - 1;

/*
Одоо Pagination тооцоолол бүх зүйлүүдээ буцаагаад clint талдаа илгээх ёстой буюу ө.х   

    pagination.total = total;
    pagination.start = start;
    pagination.end = end;
    pagination.pageCount = pageCount; гэх мэт шинээр atribute -үүсгэж өгөөд

res.status(200).json({
            success:true,
            data:allCategories,
            pagination,
            total,
            pageCount,
            start,
            end
           
        }) энд response талдаа оруулж өгөх ёстой байгаа. Гэх мэт цувуулаад хийж өгөх боломжтой боловч
         pagination

 */








       console.log(req.query, select, sort1, limit1);
        
        const allCategories = await CategoryModel.find(req.query, select)
        .sort(sort1)
        .limit(limit1)
        .skip(start - 1)

        res.status(200).json({
            success:true,
            data:allCategories,
            pagination,
           
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

Lesson40



*/