import {Router} from "express"
import {signIn,login} from "../controller/userController.js"
import {validatesigIn,validateLogin} from "../middlewere/validateUser.js"
import { profileData } from "../controller/profileController.js";
import { getProfile } from "../controller/profileController.js";
import { getBuddies } from "../controller/matchBuddiesController.js";

const userRouter =Router()
userRouter.post("/signin",validatesigIn,signIn)
userRouter.post("/login",validateLogin,login)

userRouter.post("/profile",profileData)
userRouter.get("/getProfile",getProfile)
userRouter.get("/getBuddies",getBuddies)
export {userRouter}