import Router from "express"
import {signIn,login} from "../controller/userController.js"
import {validateUser} from "../middlewere/validateUser.js"
const userRouter =Router()
userRouter.post("/signin",validateUser,signIn)
userRouter.post("/login",validateUser,login)
export {userRouter}