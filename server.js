const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require('dotenv').config()

var dbconnection = require('./db');
var userRoute = require('./routes/userRoute');
var postRoute = require('./routes/postRoute');

app.use(bodyParser.json());

app.use('/api/users/', userRoute)
app.use('/api/posts/',postRoute)

if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static('client/build'))

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client/build/index.html'));
    })
}

const port = process.env.PORT || 8000;

app.listen(port,() => console.log("Node Js Server Started"));
