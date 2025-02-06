import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
import {profile} from "../model/profileModel.js"
import "dotenv/config"
const jwtKey=process.env.JWT_SECRET_KEY
const profileData=async(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        return res.status(401).send("Token is required" );
    }
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
       const {username,email}=decoded
        const users=await User.findOne({email})
         if(!users){
         return res.status(404).send("user not found")
         }
         const profileExists=await profile.findOne({username,email})
         if(profileExists){
            return res.status(409).send("profile already exits")
         }
        const {name,city,preferredWorkout,fitnessGoals}=req.body
        const newProfile=new profile({
            userId:users._id,
            username:users.username,
            email:users.email,
            name:name,
            city:city,
            preferredWorkout:preferredWorkout,
            fitnessGoals:fitnessGoals,
            createdAt:new Date()
        })  
        await newProfile.save()
        res.status(201).send("Profile Successfully Created!")
    }catch(err){
        return res.status(500).send({ error: "Internal server error", details: err.message });

    }
}


  
const getProfile=async(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        return res.status(401).send("token not exists")
    }
    try{
        const decodedToken= jwt.verify(token,jwtKey)
        const {username,email}=decodedToken
        const dataProfile=await profile.findOne({username,email})
        res.status(200).json({dataProfile})

    }catch(err){
    res.status(500).json({ error: "Error in token", details: err.message });

    }

}
export {profileData,getProfile}