const { response } = require('express');
const express = require('express');
const fileUpload = require ('express-fileupload');

const app = express();

app.use(fileUpload());
app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/view/index.html");
});

app.post("/upload", (req, res)=>{
    console.log("upload attempted");
    //to move the file to uploads folder
});
app.listen(8080);
