const { header } = require('express-validator')
const jwt=require('jsonwebtoken')
const User=require('../Models/User')

const StudentAuth=(req,res,next)=>{
  if(req.user.role==="Student")
  { next()} 
  else 
  {res.status(403).send()} 
}
module.exports=StudentAuth