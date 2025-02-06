import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
import {profile} from "../model/profileModel.js"
import "dotenv/config"
const jwtKey=process.env.JWT_SECRET_KEY
const profileData=async(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        return res.status(403).send("Token is required" );
    }
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
       const {username,email,userId}=decoded
        const users=await User.findOne({username,email})
         if(!users){
         return res.status(401).send("user not found")
         }
         const profileExists=await profile.findOne({username,email})
         if(profileExists){
            return res.status(201).send("profile already exits")
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
        res.status(200).send(newProfile)

    }catch(err){
        return res.status(500).send({ error: "Internal server error", details: err.message });

    }
}


  
const getProfile=async(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        return res.status(403).send("token not exists")
    }
    try{
        const decodedToken= jwt.verify(token,jwtKey)
        const {username,email}=decodedToken
        const dataProfile=await profile.findOne({username,email})
        res.status(201).json({dataProfile})

    }catch(err){
    res.status(404).json({ error: "Error in token", details: err.message });

    }

}
export {profileData,getProfile}