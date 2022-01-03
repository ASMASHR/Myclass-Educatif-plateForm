
const jwt=require('jsonwebtoken')
const User=require('../Models/User')

const isAuth=async(req,res,next)=>{

try {
    const token=req.headers["authorization"]
    if (!token){
    res.status(400).send('unauthorized111')  
    }
    
    const decoded=await jwt.verify(token,process.env.privateKey)
    const user=await User.findById(decoded._id).select("-password")
    console.log(user)
    if (!user)
    {return res.status(400).send('no user')}
    else
    {
     req.user=user
    return next()}
} catch (error) {
    res.status(400).send('unauthorized')
    
}
}
module.exports=isAuth