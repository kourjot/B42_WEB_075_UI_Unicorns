import { workout } from "../model/workoutTracking.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtKey = process.env.JWT_SECRET_KEY;
const caloriesBrn = { running: 20, weightlifting: 7, yoga: 5, cardio: 15 };
const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const decodeToken = (token) => {
  if (!token) throw new Error("Authorization token is required");
  return jwt.verify(token, jwtKey);
};

const workoutUpdate = async (req, res) => {
  const token = req.headers["authorization"];
  const { preferredWorkout, workoutDuration } = req.body;

  try {
    // Validate request body
    if (!preferredWorkout || !workoutDuration) {
      return res.status(400).json({ error: "Preferred workout and workout duration are required" });
    }

    if (!(preferredWorkout in caloriesBrn)) {
      return res.status(400).json({ error: "Invalid workout type" });
    }

    if (typeof workoutDuration !== "number" || workoutDuration <= 0) {
      return res.status(400).json({ error: "Workout duration must be a positive number" });
    }

    // Calculate calories burned
    const totalCaloriesBurn = workoutDuration * caloriesBrn[preferredWorkout];

    // Get current day
    const currentDay = daysOfWeek[new Date().getDay()];

    // Decode JWT and get user info
    const { email } = decodeToken(token);

    // Find existing workout data or create new entry
    let userWorkout = await workout.findOne({ email });

    if (!userWorkout) {
      userWorkout = new workout({
        email,
        weekWorkouts: { [currentDay]: [{ preferredWorkout, workoutDuration, caloriesBurn: totalCaloriesBurn }] }
      });
    } else {
      if (!userWorkout.weekWorkouts[currentDay]) {
        userWorkout.weekWorkouts[currentDay] = [];
      }
      userWorkout.weekWorkouts[currentDay].push({ preferredWorkout, workoutDuration, caloriesBurn: totalCaloriesBurn });
    }

    // Save workout data
    await userWorkout.save();

    return res.status(200).json({ message: "Workout data updated successfully" });

  } catch (err) {
    console.error("Workout Update Error:", err.message);
    return res.status(500).json({ error: "Error updating workout data", details: err.message });
  }
};

export { workoutUpdate };
