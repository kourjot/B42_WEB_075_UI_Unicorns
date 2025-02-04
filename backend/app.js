import express from "express"
import "dotenv/config"
import{connection} from "./config/db.js"
import {userRouter} from "./router/userRouter.js"
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
    connection()
})