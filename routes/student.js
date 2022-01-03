var express=require('express')
var Studentrouter=express.Router()
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt')
var isAuth= require('../middelware/isAuth')
var StudentAuth = require('../middelware/StudentAuth')
const {editEmailRules,editMPRules,Validator}=require("../middelware/validator");
const User=require('../Models/User')
const Course=require('../Models/Course');
const {uploadImage}=require("../middelware/validator");
const adminAuth = require('../middelware/adminAuth');

// GET ALL STUDENTS
Studentrouter.get('/AllStudents',async(req,res)=>{

try {
    const Students= await  User.find({"role":"Student"})
    res.status(200).send({msg : "users found" , Students })
} catch(error)
    {
        return res.status(500).send({msg : "error get Students server"})

    } 
    })

// get one Student
Studentrouter.get('/student/:_id',async(req,res)=>{
const {_id}=req.params

try {
    const Student= await  User.findById(_id).populate('courses')
    res.status(200).send({msg : "user found" , Student })
} catch(error)
    {
        return res.status(500).send({msg : "error get Student server"})

    } 
    })

//  EDIT A USER
        //CHANGE THE PROFILE PICTURE 

Studentrouter.put('/EditStudentPic/:_id',isAuth,StudentAuth,uploadImage,(req,res)=>{
    const {_id}=req.params
    let Newpic=req.file

var imm = Newpic.path.substring(Newpic.path.lastIndexOf('\\') + 1);
    User.findByIdAndUpdate({_id},{$set:{profilePic:imm}})
     .then (user=>res.send({"we update": user}))
    .catch(err=>{console.log(err)})
    })

      //CHANGE THE FIRST AND LAST NAME  ,

Studentrouter.put('/EditStudentName/:_id',isAuth,StudentAuth,(req,res)=>{
    let {_id}=req.params
    let {FirstName,LastName}=req.body
    User.findByIdAndUpdate({_id},{$set:{firstName:FirstName,lastName:LastName}})
    .then (user=>res.send({"we update": user}))
    .catch(err=>{console.log(err)})
}) 
      //CHANGE the PASSWORD StudentAuth

Studentrouter.put('/EditPassword/:_id',isAuth,StudentAuth,editMPRules(),Validator,async(req,res)=>{
    let {_id}=req.params
    let {currentPassword,NewPass,confirmPass}=req.body
    try {
        let person= await User.findById({_id})
        const isMatch = await bcrypt.compare(currentPassword, person.password);
        if (!isMatch) {
            res.status(400).send({ msg: "wrong password" })}
        if(NewPass!==confirmPass)
            {res.status(400).send({msg:"not matches"})}
        let newpassword= await bcrypt.hash(NewPass,10)
        let Updateduser=await User.findByIdAndUpdate({_id},{password:newpassword},{new:true})
            return res.status(200).send({msg: "we update",Updateduser})
        
    }
    catch (error) {
      res.status(500).send({msg : "error server " })
    }
})

// edit STUDENT ADRESS 
Studentrouter.put('/EditEmail/:_id',isAuth,StudentAuth,editEmailRules(),Validator,async(req,res)=>{
    let {_id}=req.params
    let {currentEmail,NewEmail,confirmmail}=req.body
    try {
        let student=await User.findById({_id})
        if (student.email!==currentEmail)
            res.status(400).send({ msg: "your current Email is wrong" })
        if(NewEmail!==confirmmail)
            res.status(400).send({ msg: "your confirm Address and your New Adress should be the same" })
        let usr=await User.findOne({email:NewEmail})
        
        
        if(usr){
            return res.status(400).send({msg : 'this email is already exist' })
        }
        else
             {student.email=NewEmail
             student.save()}
            return res.status(200).send({msg: "we update",student})
        
    } catch (error) {
              res.status(500).send({msg : "error server " })
    }
})
    
// -------------------------------
// REMOVE A USER BY ID 
Studentrouter.delete('/DeleteStudent/:_id',isAuth,adminAuth,(req,res)=>{
     let {_id}=req.params
     User.findByIdAndDelete({_id})
     .then (user=>res.send({"we delete": user}))
    .catch(err=>{console.log(err)})
})
// GET ALL STUDENTS ,
Studentrouter.get('/AllStudents',async(req,res)=>{
    try {
        const Students= await User.find({role:"Student"})
        res.status(200).send({ Students })

    } catch (error) {
        return res.status(500).send({msg : "error get Students server"})
    
    }
})
// _______________________________________________

// ------------------------SUBSCRIBE TO COURSE------------------------
Studentrouter.put('/Subscribe/:_id',isAuth,StudentAuth,async(req,res)=>{
    let {_id}=req.params //id Course
    let {StudentId}=req.body
    let student={FollowerId:StudentId,ratingScore:0}
    try {
        let user= await User.findOne({_id:StudentId})
        let cr= await Course.findById({_id})
        let StudentCourse=await user.courses.find(el=>el._id==_id)
        if(StudentCourse!==undefined)
            {res.status(500).send({msg : "u are already subscribed" ,StudentCourse})}
        else
        {  
             let courss={_id:cr._id,InscriptionDate:Date.now(),Progress:{ChapterLevel:0,ModuleLevel:0,ProgressPercent:0,QuizResult:[]}}
        user.courses.push(courss);            
        cr.Followers.push(student);
        cr.save()
        user.save();
        res.status(200).send({msg : "success subscribing" , user,cr})
    }} 

catch(error)
    {
        return res.status(500).send({msg : "error updating user server"})
    } 
})
// SAVE THE COURSE LEVEL 
Studentrouter.put('/courseLevel/:_id',isAuth,StudentAuth,async(req,res)=>{
    let {_id}=req.params; //id student
    let {CourseId,ModLevel,ChapLevel}=req.body
    let totalChap=0
    let i=0
    try {
        let courseContent=await Course.findOne({_id:CourseId})
        let nmodule=courseContent.Modules.length
    while (i<nmodule)
    {
        totalChap+=courseContent.Modules[i].Chapters.length
        i++
    }
    totalChap+=courseContent.Modules.length
    console.log("totalChap",totalChap)
    let student=await User.findById({_id})
    let Mycourse=await student.courses.find(el=>el._id==CourseId)
    if (ChapLevel===courseContent.Modules[ModLevel].Chapters.length)
        { 
            Mycourse.Progress.ModuleLevel=ModLevel+1
            Mycourse.Progress.ChapterLevel=0
        }       
    else
    {
        Mycourse.Progress.ModuleLevel=ModLevel
        Mycourse.Progress.ChapterLevel=ChapLevel+1
}

let CurrentProg=Mycourse.Progress.ProgressPercent
// 
Mycourse.Progress.ProgressPercent=Math.min(100,Math.round(CurrentProg +(100/totalChap)))
    student.save()
    res.status(200).send({msg : "user updated" , student,Mycourse})

    } catch (error) {
        console.log(error)
    }
})

//Save the quiz Answers
Studentrouter.put('/SaveQuizAnswers/:courseId/:ModuleId',isAuth,StudentAuth,async(req,res)=>{
    let {courseId,ModuleId}=req.params; 
    let {studentId,theQuiz,QuizScore}=req.body
   
    try {
       
        let student=await User.findById({_id:studentId})
    let StudenCourse=student.courses.find(course=>course._id==courseId)
    let ModuleQuiz={ModuleId,theQuiz,QuizScore}
 
    StudenCourse.Progress.QuizResult.push(ModuleQuiz)
    
        student.save()
    } catch (error) {
        console.log(error)
    }
})
// retakeQuiz
// Delete old Quiz
Studentrouter.put('/DeleteQuizAnswers/:courseId/:ModuleId',isAuth,StudentAuth,async(req,res)=>{
    let {courseId,ModuleId}=req.params; 
    let {studentId}=req.body
   let a=[] //to save the other quiz result
    try {
       
        let student=await User.findById({_id:studentId})
    let StudenCourse=student.courses.find(course=>course._id==courseId)
    
   a= StudenCourse.Progress.QuizResult.filter(el=>el.ModuleId!==ModuleId)
    StudenCourse.Progress.QuizResult=a
    console.log("StudenCourse.Progress.QuizResult",StudenCourse.Progress.QuizResult)
    student.save()
    } catch (error) {
        console.log(error)
    }
})


module.exports=Studentrouter