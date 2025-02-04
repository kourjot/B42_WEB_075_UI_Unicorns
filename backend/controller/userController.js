import {User} from "../model/userModel.js"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import "dotenv/config"
const signIn=async(req,res)=>{
    const {username,email,password} =req.body
    try{
        const userExists =await  User.findOne({email})
        if(userExists){
            return res.status(400).json({msg:"User already exists"})
        }
        const hash=await argon2.hash(password)
        const newUser=new User({
            username,
            email,
            password:hash
        })
        await newUser.save()
        res.status(201).json({msg:"User registered successfully"})
    }catch(err){
        res.status(500).json("Error in registration",err)
    }
}
const login =async(req,res)=>{
    const {email,password} =req.body
    try{
       const userExists=await User.findOne({email})
    //    console.log(userExists)
       if(!userExists){
           return res.status(404).json({msg:"User not found"})
       }
       const valid=await argon2.verify(userExists.password,password)
       if(!valid){
         return res.status(401).json({msg:"Invalid credentials"})
       }
       const token=jwt.sign({
        username:userExists.username},
        process.env.SECRET_KEY,
        {expiresIn:"7days"})

        res.status(201).json({msg:"Logged in successfully",token:token})
       
    }catch(err){
        res.status(500).json({ msg: "Error in login", details: err.message });
    }
}
export {signIn,login}