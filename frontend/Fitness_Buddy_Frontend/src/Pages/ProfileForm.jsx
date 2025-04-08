import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Components/Common/Navbar";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    city: "", // Changed from 'location' to match backend
    preferredWorkout: "", // Changed from 'preferredWorkouts' to match backend
    fitnessGoals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://b42-web-075-ui-unicorns.onrender.com/createprofile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure JSON request
            Authorization: `${token}`, // Proper token format
          },
          body: JSON.stringify(profile), // Send JSON directly
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile submitted successfully!");
        navigate("/showprofile"); // Navigate without refresh
      } else {
        console.error("Error submitting profile:", data);
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      // console.error("Network error:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/vector-damask-seamless-pattern-background-classical-luxury-old-fashioned-damask-ornament-royal-victorian-seamless-texture-wallpapers-textile-wrapping-exquisite-floral-baroque-template_1217-738.jpg?ga=GA1.1.2144125845.1737116705&semt=ais_hybrid')",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg p-10 rounded-lg shadow-lg max-w-lg w-full bg-cover bg-center">
          <h2 className="text-2xl font-semibold text-center text-black mb-6">
            Create Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-black block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-white bg-transparent text-black placeholder-gray-700 focus:ring focus:ring-blue-300 outline-none backdrop-blur-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-black block mb-1">City:</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-white bg-transparent text-black placeholder-gray-700 focus:ring focus:ring-blue-300 outline-none backdrop-blur-lg"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label className="text-black block mb-1">Preferred Workouts:</label>
              <select
                name="preferredWorkout"
                value={profile.preferredWorkout}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-white bg-transparent text-black focus:ring focus:ring-blue-300 outline-none cursor-pointer backdrop-blur-lg"
              >
                <option value="" className="bg-black text-white">Select</option>
                <option value="yoga" className="bg-black text-white">Yoga</option>
                <option value="running" className="bg-black text-white">Running</option>
                <option value="weightlifting" className="bg-black text-white">Weightlifting</option>
                <option value="cardio" className="bg-black text-white">Cardio</option>
              </select>
            </div>

            <div>
              <label className="text-black block mb-1">Fitness Goals:</label>
              <select
                name="fitnessGoals"
                value={profile.fitnessGoals}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-white bg-transparent text-black focus:ring focus:ring-blue-300 outline-none cursor-pointer backdrop-blur-lg"
              >
                <option value="" className="bg-black text-white">Select</option>
                <option value="weight gain" className="bg-black text-white">Weight Gain</option>
                <option value="weight loss" className="bg-black text-white">Weight Loss</option>
                <option value="bulking" className="bg-black text-white">Bulking</option>
                <option value="flexibility" className="bg-black text-white">Flexibility</option>
                <option value="muscle build" className="bg-black text-white">Muscle Build</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-transparent text-black border border-white py-2 rounded-md transition duration-300 cursor-pointer hover:bg-white/10 backdrop-blur-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
