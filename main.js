const express = require('express');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
const fs = require('fs');

const ID = 'AKIAQ6SWUQ66F6PS5GW6';
const SECRET = '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';

const s3 = new AWS.S3({
    accessKeyId: ID, 
    secretAccessKey: SECRET
});

const app = express();

app.use(fileUpload());
app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/view/index.html");
});

// const s3_parameters = {
//     Bucket: 'minor-project-kunal',
//     CreateBucketConfiguration: {
//         LocationConstraint: "ap-south-1",
//     }
// };
// s3.createBucket(s3_parameters, (err,data)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// });
app.post("/upload", (req, res)=>{
    console.log("upload attempted");
    //to move the file to uploads folder
    //console.log(req.files);
    if(!req.files || Object.keys(req.files).length==0)
    {
        return res.status(400).send('No file was uploaded');
    }
    //console.log(Object.keys(req.files));
    let sampleFile = req.files.sampleFile;
    console.log(sampleFile);
    let name = sampleFile.name;
    sampleFile.mv('uploads/'+ name, (err)=>{
        if(err)
        {
            return res.status(500).send(err);
        }
        res.send('file uploaded');
        const fileContent = fs.readFileSync('uploads/'+ name);
        const s3_parameters = {
            Bucket: 'minor-project-kunal',
            Key: name, 
            Body: fileContent
        };
        s3.upload(s3_parameters, (err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else{
                console.log(data);
            }
        });
        
    })
});
app.listen(8080);
