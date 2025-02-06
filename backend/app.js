import express from "express"
import "dotenv/config"
import{connection} from "./config/db.js"
import {userRouter} from "./router/userRouter.js"
import cors from "cors"
import { profileRouter } from "./router/profileRouter.js"
const app=express()
const PORT = process.env.PORT || 3110
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(profileRouter)
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
    connection()
})