import { Schema ,model} from "mongoose";
const workoutTrackingSchema = new Schema({
    email:{type:String,required:true,unique:true},
    weekWorkouts: { 
        monday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        tuesday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        wednesday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        thursday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        friday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        saturday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ],
        sunday: [
            {
                preferredWorkout: { type: String, required: true },
                workoutDuration: { type: Number, required: true },
                caloriesBurn:{type:Number}
            }
        ]
    }
});


const workout=model("workout",workoutTrackingSchema)
export {workout}