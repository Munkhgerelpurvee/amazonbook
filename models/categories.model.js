// Lesson26 Mongoose дээр Категорийн моделийг үүсгэх
const mongoose = require("mongoose");
// Категорийн Schema -үүсгэнэ. Schema -дотор категори маань юу юунаас тогтохыг зааж өгнө.

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Категорийн нэрийг оруулна уу"],
        unique:true,
        trim:true,
          /*
      trim:true гэдэг нь бид категорийн нэрийг insert - хийдээ хойно нь хоосон зай, enter дарж дамжуулсан зэрэг байх юм бол тэдгээр харагдахгүй тэмдэгтүүдийг mongoose автоматаар тэмдэглэж өгнө гэсэн тохиргоо юм.
        */
        maxlength:[50, "Категорийн нэрийн урт дээд тал нь 50 тэмдэгт байх ёстой."]
    },
    description: {
        type: String,
        required:[true, "Категорийн тайлбарыг заавал оруулах ёстой."],
        maxlength:[500, "Категорийн тайлбарын урт дээд тал нь 500 тэмдэгт байх ёстой."]

    },
    photo: {
        type: String,
        default:"no-photo.jpg"
        /*
        Бид зургийг  upload хийдэг rest Api хийнэ. Гэхдээ бид  upload  хийсэн зургийн том өгөгдлийг биш харин зургийн нэрийг нь замтай нь цуг  хадгалъя. ӨХ ийм зураг шүү гэж зургийг нэрийг нь хадгалах тур төрөл нь string байна. энэ нь  default:"no-photo.jpg" зураггүй категорит буюу зураг илгээхгүй бол өгөдлийн сан руу ийм утга автоматаар бичигдэнэ.
        */

    },
    averageRating: {
        type: Number,
        min:[1, "Рэйтинг хамгийн багадаа 1 байх ёстой."],
        max:[10, "Рэйтинг хамгийн ихдээ 10 байх ёстой."],
    },
    averagePrice: Number,
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CategoryModel", CategorySchema);

    /*
    module.exports = mongoose.model("Category", CategorySchema); бид энд үүсгэсэн Category нэртэй моделийг ашиглаад Category-гэдэг обьект руу mongoose.write, read, insert , delete, search хийх зэргийг mongoose бидэнд гаргаж өгнө.

    mongoDb бол огт Schema-тэй ажиллахгүй харин бид schema-тай ажиллах буюу бидний ажиллагааг дундуур маань mongoose орж ирж хялбарчилж хийж өгч байна гэсэн үг.
       
        */

    /*
 CategorySchema буюу бид category гэдэг model-ийг 
   name
   description
   photo
   averageRating
   averagePrice гэсэн 5 тайлбартай JSON мэдээлэл болж хувирна. Үүнийгээ Category гэдэг нэрээр экспорт хийгээд гаргачихсан. Дараа нь бид Category - гэдэг нэрээр өгөгдлийн сан руу CRUD хийх боломжтой болно.
        */
