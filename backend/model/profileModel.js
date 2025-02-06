import {Schema,model} from "mongoose"

const profileSchema=new Schema({
   name:{type:String,required:true,unique:true},
   city:{type:String,required:true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true,
      },
      email:{type:String,required:true},
      username:{type:String,required:true},
    preferredWorkout:{
        type:String,
        required:true,
        enum:["running","weightlifting","yoga","cardio"]
    },
    fitnessGoals:{type:String,required:true,
        enum:["weight gain","weight lose","bulking","flexibility","muscle build"]
    },
    createdAt:{
        type:Date,default:Date.now
    }
})

const profile=model("profile",profileSchema)

export {profile}