 const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blackListModel = require("../model/blackListToken.model")

const registerUser = async(req,res)=>{
    const {email,username,password} = req.body

    const alreadyRegistered = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(alreadyRegistered){
        return res.status(409).json({
            message:email === alreadyRegistered.email ? "Account has been registered on same email" : "username is  not available"
        })
    }

    const hash = await bcrypt.hash(password,10)
    
    const userRegistered = await userModel.create({
        email,
        username,
        password:hash
    })
    
    const user = userRegistered.toObject()
    delete user.password
        const token = jwt.sign({
            id:userRegistered._id
        },process.env.JWT_SECRET,{expiresIn:"3h"})
        
        res.cookie("token",token)

    res.status(201).json({
        success:true,
        message:"User has been registered",
        user
    })

}
const loginUser = async(req,res)=>{
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isValid = await bcrypt.compare(password,user.password)

    
    if(!isValid){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"3h"})
    
    res.cookie("token",token)

    res.status(201).json({
        message:"User logged in successfully"
    })
}
const getUser = async(req,res)=>{
    const user = req.user;
    
    const token = req.cookies.token
    const blackListed = await blackListModel.findOne({token})
    if(blackListed){
        return res.status(401).json({
            message:"invalid token"
        })
    }
    const userRecord = await userModel.findById(user);
    
    res.status(200).json({
        message:"user data fetched successfully",
        userRecord
    })

}
const logout = async(req,res)=>{
    const token = req.cookies.token
    
    const blackListed = await blackListModel.create({
        token
    })
    
    res.clearCookie("token")

    res.status(200).json({
        message:"user has been logged out"
    })
}

module.exports = {registerUser,loginUser,getUser,logout}