// Lesson26 Mongoose дээр Категорийн моделийг үүсгэх
const mongoose = require("mongoose");
// import { transliterate as tr, slugify } from 'transliteration';
const {transliterate,slugify } = require("transliteration");


const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Номын нэрийг оруулна уу"],
        unique:true,
        trim:true,
        maxlength:[250, "Номын нэрийн урт дээд тал нь 250 тэмдэгт байх ёстой."]
    },
    photo: {
        type: String,
        default:"no-photo.jpg"
    

    }, 
    author:{
        type:String,
        required:[true, "Зохиолчийн нэрийг заавал оруулна уу"],
        trim:true,
        maxlength:[50, "Зохиолчийн нэрийн урт дээд тал нь 50 тэмдэгт байх ёстой."]
    },
    averageRating: {
        type: Number,
        min:[1, "Рэйтинг хамгийн багадаа 1 байх ёстой."],
        max:[10, "Рэйтинг хамгийн ихдээ 10 байх ёстой."],
    },
    price: {
        type: Number,
        required:[true, "Номын үнийг заавал оруулна уу"],
        min:[2500, "Номын үнэ хамгийн багадаа 2500 төгрөг байх ёстой."],
    
    },
    balance: Number,
    content:{
        type:String,
        required:[true, "Номын тайлбарыг заавал оруулна уу"],
        trim:true,
        maxlength:[5000, "Номын тайлбарын урт дээд тал нь 5000 тэмдэгт байх ёстой."]
    }, 
    bestseller:{
        type:Boolean,
        default:false
    },
    available:[String],
    // book болгон энэ категори моделтой холбоотойгоор заавал нэг категорийн id---ийг нь дотроо агуулна.Нэг категори бол олон номтой нөгөө талаас энгийн байлгах үүднээс нэг ном бол нэг л категоритой байна гэж үзье.Тэгэхээр бид энд холболтыг нь хийж өгнө буюу категори модел болон book model-хоёрыг холбож байгаа гэсэн үг юм.

    /*

    category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
}
// 
    Энэ код нь MongoDB-д хадгалагдаж буй ном бүрийг (BookModel) тодорхой нэг категоритай (Category) холбож өгөх зориулалттай.

1.1. type: mongoose.Schema.ObjectId
ObjectId гэдэг нь MongoDB-д өгөгдлийг хадгалахдаа ашигладаг тусгай ID юм.

MongoDB доторх бусад коллекцийн (table-ийн) обьектуудыг заахад ашиглагдана.

Өөрөөр хэлбэл, энэ талбар нь "Category" коллекцийн _id утгыг хадгалах зориулалттай гэсэн үг.

// 
1.2. ref: "Category" гэж юу вэ?
ref: "Category" нь энэ талбарт хадгалагдаж буй ObjectId нь "Category" коллекцийн ID юм гэдгийг зааж өгч байна.

Энэ тохиргоог хийснээр Mongoose-д populate() функцийг ашиглах боломж олгоно.

populate() нь ObjectId-г ашиглан холбогдох Category мэдээллийг BookModel дотор автоматаар ачаалах боломж олгоно.


    */
    category: {
        // энд категорийн id-ийг хадгална
        type: mongoose.Schema.ObjectId,
        // энд нь ямар document-тэй холбоотой юм бэ? гэдгийг нь ref гэдэгт нь зааж өгнө. ref буюу reference төрөл буюу заагч төрөл
        ref:"Category",
        required:true,


    },

    createdAt : {
        type: Date,
        default: Date.now
    }
});

// Хадгалахын өмнө slug үүсгэх буюу шинээр books үүсэхийн өмнө pre.middleware ажиллана

module.exports = mongoose.model("BookModel", BookSchema);