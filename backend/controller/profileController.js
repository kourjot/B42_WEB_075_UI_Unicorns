import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
import {profile} from "../model/profileModel.js"
import "dotenv/config"
import multer from "multer";
import V2 from "cloudinary"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename,"uploads/"); 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
export const upload=multer({storage:storage})
V2.config({
    cloud_name: process.env.Cloud_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const jwtKey=process.env.JWT_SECRET_KEY
const createprofile=async(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        return res.status(401).send("Token is required" );
    }
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
       const {username,email}=decoded
       let x;
        if(req.file){
        x = await V2.uploader.upload(req.file.path);
        
        fs.unlink(req.file.path, async (err) => {
            if (err) {
                return res.status(404).json({ message: "Error deleting the file from the server" });
            }
        })
        }
        const users=await User.findOne({email})
         if(!users){
         return res.status(404).send("user not found")
         }
         const profileExists=await profile.findOne({email})
         console.log(profileExists)
         if(x){ 
        const {name,city,preferredWorkout,fitnessGoals}=req.body
        const newProfile=new profile({
            userId:users._id,
            username:users.username,
            email:users.email,
            name:name,
            city:city,
            preferredWorkout:preferredWorkout,
            fitnessGoals:fitnessGoals,
            photo:x.secure_url,
            createdAt:new Date()
        })  
        await newProfile.save()
        res.status(201).send("Profile Successfully Created!")
         }
    }catch(err){
        return res.status(500).send({ error: "Internal server error", details: err.message });

    }
}

const updateprofile=async (req,res)=>{
    const token =req.headers["authorization"]
    if(!token){
        return res.status(401).send("Token is required")
    }
    try{
       const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
       const {username,email}=decoded 
       const findprofile=await User.findOne({email})
      
       if(!findprofile){
           return res.status(404).send("User not found")
       }
       const profileExists=await profile.findOne({username,email})
       
       if(!profileExists){
           return res.status(404).send("Profile not found")
       }
       const { name, city, preferredWorkout, fitnessGoals ,photo} = req.body;
       if(name)profileExists.name=name
       if(city) profileExists.city=city
       if(preferredWorkout)profileExists.preferredWorkout=preferredWorkout
       if(fitnessGoals)profileExists.fitnessGoals=fitnessGoals
       let newImage;
       if(req.file){
        const x = await V2.uploader.upload(req.file.path);
       
        newImage=x.secure_url
    
        if(profileExists.photo){
            const publicId = profileExists.photo.split("/").pop().split(".")[0];
                await V2.uploader.destroy
                (publicId);
        } 
        profileExists.photo=newImage
        fs.unlink(req.file.path,(err)=>{
            if (err) {
                return res.status(404).json({ message: "Error deleting the file from the server" });
            }
        })
       }
       if(photo)profileExists.photo=newImage
       await profileExists.save()
       return res.status(200).send("Profile updated successfully!")
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
export {createprofile,getProfile,updateprofile}