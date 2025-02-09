import mongoose from "mongoose";

const gymSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true }, // Store city name directly
});

export const Gym = mongoose.model("Gym", gymSchema);
