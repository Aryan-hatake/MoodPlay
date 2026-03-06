const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")
const redis = require("../config/cache")



const getToken = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    
     
   
    let isValid;
    try{
       isValid = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }


    const user = await userModel.findById(isValid.id)
    
    req.user = isValid.id,
    req.username = user.username
    next()
}

module.exports = {getToken}