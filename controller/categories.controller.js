/*
MVC ===> Model view controller architecture
Model ==> Өгөгдөлтэй ажилладаг хэсэг бичигдэнэ
view ==> Хэрэглэгчид харагдах хэсгийг бичнэ
Controller ==> model and view хоёрыг хооронд нь холбодог хэсэг буюу товч дээр дарахад үсэрдэг код ч юм уу жинхэнэ үйл ажиллагааны кодуудыг энэ хэсэгт бичнэ. Тэгэхээр controller бол гол buisness logic хэсгийг хийдэг хэсэг байна.

    Энэ архитектур гарахаас өмнө бол хэрэглэгчид харагдах хэсэг 
    болон ажиллах хэсэг
    мөн өгөгдлийн хэсгийн кодууд бүгд нэг бичигддэг байсан. 

    Бид Model--- хэсгийг яваандаа database-тэй холбоод ирэхээр гаргаад ирэх болно. Мөн бидэнд одоохондоо бол view---бол байхгүй байна. Учир нь Resr api bachEnd гэдэг бол Model and controller хоёр юм.

    view ==> хэсгийг нь React web application эсвэл React Native гар утасны апп зэрэг хийдэг байгаа. Тэгэхээр бид өнөөдрийн lesson19 дээр controller хэсгийнх нь кодыг бичиж өгч байна. 



*/
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


exports.createCategory = (req, res, next) => {
    res.status(200).json({
        success:true,
        data:"Шинэ категори үүсгэнэ..."
    });
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
