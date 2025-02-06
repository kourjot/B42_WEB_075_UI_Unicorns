import { workout } from "../model/workoutTracking.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtKey = process.env.JWT_SECRET_KEY;
const getWorkoutDataForDay = async (req, res) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayIndex = new Date().getDay();
    const currentDay = daysOfWeek[currentDayIndex];
   
    const token = req.headers["authorization"];
  
    try {
      const decoded = jwt.verify(token, jwtKey);
      const { email } = decoded;
  
      let data = await workout.findOne({ email });
  
      if (!data) {
        return res.status(404).json({ message: "No workout data found for the user." });
      }
      const dayWorkouts = data.weekWorkouts[currentDay];
  
      if (!dayWorkouts || dayWorkouts.length === 0) {
        return res.status(404).json({ message: `No workout data found for ${currentDay}.` });
      }
  
  
      
      // Calculate the total workout duration and total calories burned
      const totalWorkoutDuration = dayWorkouts.reduce((acc, workout) => acc + workout.workoutDuration, 0);
      // console.log("Total Workout Duration:", totalWorkoutDuration);
  
      const totalCaloriesBurned = dayWorkouts.reduce((acc, workout) => acc + workout.caloriesBurn, 0);
      // console.log("Total Calories Burned:", totalCaloriesBurned);
  
      return res.status(200).json({
        message: `${currentDay}`,
        totalWorkoutDuration,
        totalCaloriesBurned,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching workout data", details: err.message });
    }
  };
  
  export { getWorkoutDataForDay };