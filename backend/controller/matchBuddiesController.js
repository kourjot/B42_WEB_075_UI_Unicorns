import { profile } from "../model/profileModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const Jwt_key = process.env.JWT_SECRET_KEY;

export const getBuddies = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    try {
        // Decode the token to get the current user's data
        const decodedData = jwt.verify(token, Jwt_key);
        const { username, email } = decodedData;

        // Find the current user's profile to get their city and fitness goals
        const nearbyUser = await profile.findOne({ email }); // Use findOne to get a single user profile

        if (!nearbyUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { city, fitnessGoals } = nearbyUser; // Extract city and fitnessGoals from the user profile

        // Find other users with the same city and fitness goals, excluding the current user
        const getBuddies = await profile.find({
            city,
            fitnessGoals,
            email: { $ne: email } // Exclude the current user by email
        })

        if (getBuddies.length === 0) {
            return res.status(404).send("No buddies found");
        }

        return res.status(200).json(getBuddies); // Send the list of buddies
    } catch (err) {
        console.log("Error:", err);
        return res.status(400).json({ message: "Error in getting buddies", err });
    }
};