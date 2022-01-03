
const { header } = require('express-validator')
const jwt=require('jsonwebtoken')
const User=require('../Models/User')

const adminAuth=(req,res,next)=>{
  if(req.user.role==="Administrator")
  { next()} 
  else 
  {res.status(403).send()} 
}
module.exports=adminAuth
