import express from 'express'
import { authMw } from '../middlewere/authMw.js';
import { createProfile,fetchProfile,updateProfile } from '../controller/profileController.js';

const profileRouter = express.Router();

// profile-creation
profileRouter.post("/profile",authMw, createProfile)

// Fetch user profile
profileRouter.get("/profile",authMw, fetchProfile);

// Update Profile
profileRouter.put("/profile",authMw, updateProfile);

export {profileRouter}
