import jwt from "jsonwebtoken";
import { FitnessClass } from "../model/fitnessClassModel.js";
import { profile } from "../model/profileModel.js";

const getFitnessClasses = async (req, res) => {
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

        const { username, email } = decoded;

        // Find user profile based on email
        const userProfile = await profile.findOne({ email });
        if (!userProfile) return res.status(404).json({ error: "User profile not found" });

        const city = userProfile.city;
        if (!city) return res.status(404).json({ error: "City not found in profile" });

        // Find fitness classes in the user's city
        const classes = await FitnessClass.find({ city });

        if (classes.length === 0) return res.status(404).json({ error: "No fitness classes found in this city" });

        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFitnessClass = async (req, res) => {
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

        const { name, city, schedule, instructor } = req.body;
        if (!name || !city || !schedule || !instructor) {
            return res.status(400).json({ error: "Name, city, schedule, and instructor are required!" });
        }

        // Check if Fitness Class already exists in the given city
                const existingFitnessClass = await FitnessClass.findOne({ name, city, schedule, instructor });
                if (existingFitnessClass) {
                    return res.status(400).json({ error: "Fitness class already added!" });
                }

        // Create new fitness class
        const newClass = new FitnessClass({ name, city, schedule, instructor });
        await newClass.save();

        res.status(201).json({ message: "Fitness class added successfully!"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getFitnessClasses, addFitnessClass };
