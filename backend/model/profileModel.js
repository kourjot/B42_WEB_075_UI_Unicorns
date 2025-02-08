import {Schema,model} from "mongoose"

const profileSchema=new Schema({
   name:{type:String,},
   city:{type:String},
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true,
      },
      email:{type:String},
      username:{type:String},
    preferredWorkout:{
        type:String,
       
        enum:["running","weightlifting","yoga","cardio"]
    },
    fitnessGoals:{type:String,
        enum:["weight gain","weight lose","bulking","flexibility","muscle build"]
    },
    photo:{type:String},
    createdAt:{
        type:Date,default:Date.now
    }
})

const profile=model("profile",profileSchema)

export {profile}