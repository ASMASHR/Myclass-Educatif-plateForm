var express=require('express')
var Authrouter=express.Router()
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt')
const User=require('../Models/User')
const isAuth=require('../middelware/isAuth')

const StudentAuth=require('../middelware/StudentAuth')
const AdminAuth=require('../middelware/adminAuth')
const {registerRules,loginRules,Validator}=require("../middelware/validator");



// REGISTER STUDENT 
Authrouter.post('/Register',registerRules(),Validator,async(req,res)=>{
    // role:"Student""Administrator")
    //  first thing: add an Administrator--- role="Administrator" while registre
    const role="Student"
    let Course=[]
    let profilePic=""
    let imgMale="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
    let imgFemale="https://icons-for-free.com/iconfiles/png/512/female+person+user+woman+young+icon-1320196266256009072.png"
    let {firstName,lastName,email,password,age,gender}=req.body
       try {
           let user=await User.findOne({email})
        if(user){
            return res.status(400).send({msg : 'the user is already exist' })
        }
        if (gender==="male") {profilePic=imgMale}
        else
        {profilePic=imgFemale}

        user= new User({profilePic,firstName,lastName,email,password,age,gender,role,Course})

        // crypt the password
        const hashedPassword=await bcrypt.hash(password,10)
        user.password=hashedPassword
        await user.save()

    const paylod={
            _id:user._id
        }
        const token =await jwt.sign(paylod,process.env.privateKey);
        res.status(200).send({msg:"Register success ",user,token})}
  catch (error) {
           res.status(500).send({msg : "Register error " })
}
    res.send({msg : "Welcome!"})
})
// Login
Authrouter.post('/Login',loginRules(),Validator,async(req,res)=>{
      const {email, password}=req.body
    try {
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).send({msg:"the user does not exist"})
        }
        
        const isMatch=await bcrypt.compare(password , user.password )
        if (!isMatch)
            
         {
            return res.status(400).send({msg:"the password is wrong"})
        }
        const payload ={
            _id : user._id
        }
        user.lastLogin=Date.now()
        user.save()
        const token = await jwt.sign(payload , process.env.privateKey)
        res.status(200).send({msg : "Login Success" , user ,token})
    }
    catch(error)
    {
        return res.status(500).send({msg : "Login error"})

    } 
    })

// Student Dashbord
Authrouter.get('/Dashboard',isAuth,(req,res)=>{
    res.send({user:req.user})
})

// Admin Dashbord 
Authrouter.get('/DashboardAdmin',isAuth,AdminAuth,(req,res)=>{
    res.send({user:req.user})
})

module.exports=Authrouter