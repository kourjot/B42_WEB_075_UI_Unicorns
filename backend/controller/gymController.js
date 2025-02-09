import jwt from "jsonwebtoken";
import { Gym } from "../model/gymModel.js";
import { profile } from "../model/profileModel.js"; 

const findGym = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).json({ error: "Token is required" });

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { username,email } = decoded;

        // Find user profile based on username
        const userProfile = await profile.findOne({ email });
        if (!userProfile) return res.status(404).json({ error: "User profile not found" });

        const city = userProfile.city;
        if (!city) return res.status(404).json({ error: "City not found in profile" });

        // Find gyms in the user's city
        const gyms = await Gym.find({ city });

        if (gyms.length === 0) return res.status(404).json({ error: "No gyms found in this city" });

        res.json(gyms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addGym = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).json({ error: "Token is required" });

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { name, city } = req.body;
        if (!name || !city) {
            return res.status(400).json({ error: "Gym name and city are required!" });
        }

        // Check if gym already exists in the given city
        const existingGym = await Gym.findOne({ name, city });
        if (existingGym) {
            return res.status(400).json({ error: "Gym already added!" });
        }

        // Create new gym
        const newGym = new Gym({ name, city });
        await newGym.save();

        res.status(201).json({ message: "Gym added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export {findGym, addGym}
