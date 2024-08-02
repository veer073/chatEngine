const mongoose = require('mongoose');
const User=require("../model/userModel");

const bcrypt= require("bcrypt");
 
//for register functionality
module.exports.register= async (req,res,next)=>{
   try {
    const {  username, email,password } = req.body;
    const usernameCheck= await User.findOne({username});
    if(usernameCheck)
        return res.json({msg: "Username already in use",status: false});
    const emailCheck= await User.findOne({email});
    if(usernameCheck)
        return res.json({msg: "email already in use",status: false});
    const hashedPassword= await bcrypt.hash(password,10);
    const user= await User.create({
        email,
        username,
        password:hashedPassword,
    });
    delete user.password;
    return res.json({status:true,user});
   } catch (ex) {
    next(ex);
    
   }
};



// for login functionality


module.exports.login= async (req,res,next)=>{
    try {
     const {  username ,password } = req.body;
     const user= await User.findOne({username});
     if(!user)
         return res.json({msg: "Incorrect username or password!",status: false});
     const isPasswordValid = await bcrypt.compare(password,user.password);
     if(!isPasswordValid)
        return res.json({msg:"Incorrect username or password!",status:false});
     delete user.password;
     return res.json({status:true,user});
    } catch (ex) {
     next(ex);
     
    }
 };
 

 module.exports.setAvatar= async (req,res,next)=>{
    try {
        const userId= req.params.id;
        const avatarImage= req.body.image;
        const userData= await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    } catch (ex) {
        next(ex);
    }
 };


 //Contacts
 module.exports.getAllUsers= async (req,res,next)=>{
    try {
        const users= await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
 };
