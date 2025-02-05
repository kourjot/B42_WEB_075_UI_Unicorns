import express from "express"
import "dotenv/config"
import{connection} from "./config/db.js"
import {userRouter} from "./router/userRouter.js"
import cors from "cors"
import  {passport}  from "./googleAuth/auth.js"
import { googleRouter} from "./googleAuth/oAuthRouter.js";
const app=express()
// connectPassport()
app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use("/oauth",googleRouter)
app.use("/login",(req,res)=>{
    res.json({msg:"user login successful with oAuth credentials"})
})

app.get("/",(req,res,next)=>{
    res.send("Hello kour!")
})
app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
    connection()
})