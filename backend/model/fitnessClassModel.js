import mongoose from "mongoose";

const fitnessClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }, // Stores the city name directly
    schedule: { type: String, required: true }, // Example: "Monday, Wednesday at 6 PM"
    instructor: { type: String, required: true }
});

export const FitnessClass = mongoose.model("FitnessClass", fitnessClassSchema);