const mongoose = require("mongoose");
// Өгөгдлийн сантай холбогдох функц бичиж өгье
const connectDB = async () => {

    const connection = await mongoose.connect(
        process.env.MONGODB_URI
    );

    console.log(`mongoDB холбогдлоо : ${connection.connection.host}`.rainbow);

};
module.exports = connectDB;
