const express=require('express')
const path=require('path')
const fs=require('fs')
require('dotenv').config();
const port=process.env.PORT||5000

const app=express()

var bodyParser = require('body-parser')

const multparty=require('connect-multiparty')
const MultipartyMiddleware=multparty({uploadDir:'./Images'})

const Authrouter=require('./routes/user')
const Studentrouter=require('./routes/student')
const Courseroute=require('./routes/course')
const Messageroute=require('./routes/messages')
const ConnectDB=require('./config/ConnectDB')

ConnectDB()


app.use(express.json())

app.use('/api/auth',Authrouter)
app.use('/api/Student',Studentrouter)
app.use('/api/Courses',Courseroute)
app.use('/api/messages',Messageroute)


app.use(
    bodyParser.urlencoded({
        extended: false
    }) 
);

// upload Img using ckeditor mulipartymidleware for Ckeditor
app.use(bodyParser.json());
app.use(express.static("public"))
app.post('/upload',MultipartyMiddleware,(req,res)=>{
    var tempFile= req.files.upload
    var tempPathFile=tempFile.path
    const targetPathUrl=path.join(__dirname,"/client/public/"+tempFile.name)
if(path.extname(tempFile.originalFilename).toLocaleLowerCase()==".png"||".jpg"){
   fs.rename(tempPathFile,targetPathUrl,err=>
    { 
        res.status(200).send({uploaded:true,url:`/${tempFile.originalFilename}`})
        if(err) return console.log(err)})
}
})
// Config for  herok
if(process.env.NODE_ENV==="production")
{
    app.use(express.static('client/build'))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})
}

// port
app.listen(port,(err)=>{
    (err)?console.log(err):console.log(`the server is running on port ${port}`)
})