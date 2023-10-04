require("dotenv").config(); //configuring database
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
// var nodemailer = require('nodemailer');
var app = express();
const jwt = require('jsonwebtoken');
const baseRoute = require("./api/Routes");
const { response } = require("express");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(baseRoute);


// app.post("/posts",(req,res) => {     
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             res.status(403).json({
//                 err
//             });
//         }
//         else{
//             res.json({
//                 message:"authenticated",
//                 authData
//             });
//         }
//     });        
// });
 
// app.post("/login",(req,res) => {  
//     const data = req.body;  
//     const email = data.email;  
//     const password = data.password;    
//     const user = {
//         id:1,
//         username:"",
//         email:data.password         
//     };  
//     res.json({
//         id:1,
//         username:"",
//         email:data.password     
//     });

// });



app.listen(process.env.APP_PORT,()=>{
    console.log("server is running......" ,process.env.APP_PORT);
});