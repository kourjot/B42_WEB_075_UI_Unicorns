import {Router} from "express"
import {signIn,login} from "../controller/userController.js"
import  {forgotPassword} from "../controller/forgetPassword.js"
import {resetpassword} from "../controller/resetPassword.js"
import {validatesigIn,validateLogin} from "../middlewere/validateUser.js"
import {createprofile,getProfile,updateprofile}from "../controller/profileController.js";
import { getBuddies } from "../controller/matchBuddiesController.js";
import {tokenVerify} from "../middlewere/tokenverify.js"
import {getWorkoutDataForDay } from "../controller/particulardayWorkout.js"
import {weeklyProgress} from "../controller/weekWorkoutTrack.js"
import {workoutUpdate} from "../controller/weekWorkout.js"
import { addGym, findGym } from "../controller/gymController.js"
import { addFitnessClass, getFitnessClasses } from "../controller/fitnessClassesController.js"

const userRouter = Router()
userRouter.post("/signin",validatesigIn,signIn)
userRouter.post("/login",validateLogin,login)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/resetPassword", resetpassword)
userRouter.use(tokenVerify)
userRouter.get("/getworkoutdatafor-per-day",getWorkoutDataForDay)
userRouter.post("/createprofile",createprofile)
userRouter.get("/getProfile",getProfile)
userRouter.put("/updateProfile",updateprofile)
userRouter.get("/getBuddies",getBuddies)
userRouter.get("/weeklyProgress",weeklyProgress)
userRouter.post("/workoutUpdate",workoutUpdate)
userRouter.get("/getNearbyGyms",findGym)
userRouter.post("/addGym",addGym)
userRouter.get("/getFitnessClasses",getFitnessClasses)
userRouter.post("/addFitnessClass",addFitnessClass)
export {userRouter}