require('dotenv').config();     
const express = require('express');
const app = express();
const PORT = 3000;
var router = require("./controller/router");
var config = require("./config")
var parser = require('body-parser')
app.set('view engine', 'ejs')

app.use(express.static('views'))
app.use('/upload',express.static('upload'))
app.use(parser.json())
app.use(parser.urlencoded({extended: true}))


// // define the route
// app.get('/',
//     (req, res) => {
//         res.send(
//             `<h1 style="color: green;">
//             Hello Gfg!</h1>`
//         );
//     });


app.use('/', router);

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });