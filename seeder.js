// Энд data folder дотроос categories.data.json файлыг унших тул бидэнд файлын системийн модул хэрэгтэй.

const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
// JSON-оос уншаад database рүү бичнэ. Тиймээс database-тэй холбогддог тохиргоо config.env дотор явж байгаа. Config-той ажиллах dotenv - гэдэг library суулгасан.
const dotenv = require("dotenv");
const CategoryModel = require("./models/categories.model");

dotenv.config({path:"./config/config.env"});

// database-тэй холбогдох код бичье
mongoose.connect(
        process.env.MONGODB_URI
    );

//Одоо categories.data.json файл дотроос бүх категорио уншаад JSON object руу хөрвүүлье
/*
энэ нь node.js-ийн тусгай хувьсагч 
__dirname нь одоо энэ файл буюу seeder.js-file нь ямар зам дээр байгааг 
Энд бол string гарч ирнэ. fs.readFileSync(__dirname + "/data/categories.data.json", "utf-8");
Одоо string-ees object руу хувиргана. Одоо categoriesSeeder нь массив болоод ороод ирнэ.
*/
const categoriesSeeder = JSON.parse(fs.readFileSync(__dirname + "/data/categories.data.json", "utf-8"));

// Одоо энэ үүссэн categoriesSeeder нэртэй үүссэн обьектоо ашиглаж mongoDb-рүүгээ файлаа шидэж хийж өгье. 
/*
importData function нь categoriesSeeder дотор байгаа файлуудыг уншаад database-рүү оруулж өгнө.
Ингэхээр /data/categories.data.json файлаас уншаад categoriesSeeder рүү орсныг 
CategoryModel.create(categoriesSeeder); эндээс categoriesSeeder-ийг уншаад mongoDB рүү орчихно.
*/

importData = async () => {
    try{
     await CategoryModel.create(categoriesSeeder);
     console.log("Өгөгдлийг seeder.js-c mongooseDB руу импортлолоо...");
    } catch(err) {
     console.log(err);
    }

};

// 
deleteData = async ( ) => {
    try{
        // юу ч дамжуулахгүй бол бүгдийг нь устгачихдаг байгаа.
        await CategoryModel.deleteMany();
        console.log("Өгөгдлийг mongooseDB-ээс устгалаа...");
       } catch(err) {
        console.log(err);
       }
};

/*
Одоо seeder.js-ийг comand prompt-оос дуудахдаа аргумент дамжуулдагаар хийж өгье.
node seeder.js -d delete 
node seeder.js -i import
Тэгэхээр аргументыг хүлээж авч байгаад энэ аргументээс хамаарч юу хийхээ шийднэ гэсэн.
Аргументээ бид нар яаж хүлээж авах вэ? гэвэл node seeder.js -d энэ д нь node.js-ийн process -гэдэг аргументэд нь ороод ирчихсэн байдаг. Энэ process - нь ажиллаж байгаа script Болгон дотор байдаг node.js-ийн автоматаар үүсдэг байгаа энэ дотор нь аргумент гэдэг тусгай хувьсагч байдаг. process.argv -үүний энэ argv-аргумент гэдэг тусгай хувьсагчид нь энэ script-дээр дамжуулсан бүх параметрүүдийг массив хэлбэрээр авдаг байгаа.Тэгэхээр "-i" болон  "-d"---ийг argv-массиваас уншиж авах юм байна.
*/
 if( process.argv[2] == "-i") {
    importData();
 } else if (process.argv[2] == "-d") {
  deleteData();
 };

//  node seeder.js -d node seeder.js -i
