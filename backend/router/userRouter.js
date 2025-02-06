import {Router} from "express"
import {signIn,login} from "../controller/userController.js"
import {validatesigIn,validateLogin} from "../middlewere/validateUser.js"
import { authMw } from "../middlewere/authMw.js"
const userRouter =Router()
userRouter.post("/signin",validatesigIn,signIn)
userRouter.post("/login",validateLogin,login)
export {userRouter}