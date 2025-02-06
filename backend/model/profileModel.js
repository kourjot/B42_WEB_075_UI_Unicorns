import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the User model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"], // GeoJSON format for geospatial queries
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    preferredWorkouts: {
        type: [String], // Example: ["Yoga", "Running", "Weightlifting"]
        required: true,
    },
    fitnessGoals: {
        type: String, // Example: "Weight Loss"
        required: true,
    },
}, { timestamps: true });

// Create a geospatial index on location
profileSchema.index({ location: "2dsphere" });

const Profile = mongoose.model("Profile", profileSchema);

export {Profile}
