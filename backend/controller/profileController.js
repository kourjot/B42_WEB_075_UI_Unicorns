import { Profile } from "../model/profileModel.js";
import mongoose from 'mongoose'

const createProfile = async (req, res) => {
    try {
      const { userId, name, location, preferredWorkouts, fitnessGoals, weeklyTarget } = req.body;
      const profile = new Profile({
        user:userId,
        name,
        location,
        preferredWorkouts,
        fitnessGoals,
        weeklyTarget,
      });
      await profile.save();
      res.status(201).json({msg:"Profile created successfully!"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const fetchProfile = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        const profile = await Profile.findOne({ user: userId }).select("name location.coordinates preferredWorkouts fitnessGoals"); // Populate user email

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: userId },  // Find profile by userId
            { $set: req.body },           // Update with request body
            { new: true, runValidators: true }  // Return updated doc & validate
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
        res.status(500).json({ msg:"hello" });
    }
}

export {createProfile,fetchProfile,updateProfile}