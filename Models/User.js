const mongoose=require('mongoose')
var course=new mongoose.Schema({coursId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'},
  InscriptionDate:Date,
  Progress:{ModuleLevel:Number,
  ChapterLevel:Number,
ProgressPercent:Number,

QuizResult:[]},
})
var Userschema=new mongoose.Schema({
    profilePic:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    age:Number,
    gender:String, 
    role:String,
    lastLogin:Date,
    courses: [course],
},{ timestamps: true, collection: 'users' });

module.exports=mongoose.model("User",Userschema)