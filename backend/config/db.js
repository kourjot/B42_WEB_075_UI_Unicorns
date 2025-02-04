import {connect } from "mongoose"
import "dotenv/config"
const connection=async()=>{
    try{
      await connect(process.env.MONGO_URL)
      console.log("Connected to databas 🚀")
    }catch(err){
       console.log("Error connecting to databas: " + err)
    } 
}
export {connection}
