const express = require('express');
const dotenv = require('dotenv');

// Аппын тохиргоог process.env - рүү ачаалах
dotenv.config({path: "./config/config.env"});

const app = express();
// Express server-ийг хүсэлтэнд хариулдаг болгох
app.get('/', (req,res) => {
    res.send("Hello from express server!!!")
});

app.listen(process.env.PORT,
     console.log(`Express server: ${process.env.PORT} порт дээр аслаа ... `));
