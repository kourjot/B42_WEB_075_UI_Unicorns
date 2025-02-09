import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
import {profile} from "../model/profileModel.js"
import "dotenv/config"

const jwtKey=process.env.JWT_SECRET_KEY
const createprofile = async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send("Token is required");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { username, email } = decoded;


        const users = await User.findOne({ email });
        if (!users) {
            return res.status(404).send("User not found");
        }

        const profileExists = await profile.findOne({ email });
        if (profileExists) {
            return res.status(400).json({ error: "Profile already exists" });
        }

        const { name, city, preferredWorkout, fitnessGoals } = req.body;
     
        const newProfile = new profile({
            userId: users._id,
            username: users.username,
            email: users.email,
            name,
            city,
            preferredWorkout,
            fitnessGoals,
            createdAt: new Date()
        });

        await newProfile.save();
        res.status(201).send("Profile Successfully Created!");
    } catch (err) {
       
        console.log(err)
        return res.status(500).send({ error: "Internal server error", details: err.message });
    }
};


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
       const { name, city, preferredWorkout, fitnessGoals } = req.body;
       if(name)profileExists.name=name
       if(city) profileExists.city=city
       if(preferredWorkout)profileExists.preferredWorkout=preferredWorkout
       if(fitnessGoals)profileExists.fitnessGoals=fitnessGoals
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
        const dataProfile=await profile.findOne({email})
        console.log(dataProfile)
        res.status(200).send(dataProfile)

    }catch(err){
    res.status(500).json({ error: "Error in token", details: err.message });

    }

}
export {createprofile,getProfile,updateprofile}