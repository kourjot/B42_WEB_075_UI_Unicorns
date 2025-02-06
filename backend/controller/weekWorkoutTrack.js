import { workout } from "../model/workoutTracking.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const jwtKey = process.env.JWT_SECRET_KEY;
const weeklyProgress = async (req, res) => {
    const token = req.headers["authorization"];
    try {
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
  
      const currentDayIndex = new Date().getDay();
      // console.log(currentDayIndex);
      const currentDay = daysOfWeek[currentDayIndex];
      // console.log(currentDay);
      const decoded = jwt.verify(token, jwtKey);
      const {username, email } = decoded;
      // console.log(username,email);
      let data = await workout.findOne({ email })
      // console.log(data);
      if (!data) {
        return res.status(404).json({ error: "No workout data found for this user." });
      }
  
      const startOfWeekIndex = daysOfWeek.indexOf(currentDay);
      console.log(startOfWeekIndex);
      let totalCaloriesBurned = 0;
      let totalDuration = 0;
  
      for (let i = startOfWeekIndex; i <= currentDayIndex; i++) {
        const day = daysOfWeek[i];
  
        if (data.weekWorkouts[day]) {
          data.weekWorkouts[day].forEach(workout => {
            // console.log(workout.caloriesBurn);
            const caloriesBurn = workout.caloriesBurn; 
            totalCaloriesBurned += caloriesBurn;
            totalDuration += workout.workoutDuration;
          });
        }
      }
  
      return res.status(200).json({
        message: `Weekly progress from Monday to ${currentDay}`,
        data: {
          totalCaloriesBurned,
          totalDuration,
          totalCaloriesBurned
        },
      });
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching weekly progress", details: err.message });
    }
  };
  
export {weeklyProgress}