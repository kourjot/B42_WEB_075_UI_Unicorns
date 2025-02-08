import express from "express"
import "dotenv/config"
import{connection} from "./config/db.js"
import {userRouter} from "./router/userRouter.js"
import cors from "cors"
const app=express()
const PORT= process.env.PORT || 3110;
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.get("/",(req,res,next)=>{
    res.send("Hello kour!")
})
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
    connection()
})