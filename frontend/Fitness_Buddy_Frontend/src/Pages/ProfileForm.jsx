import React, { useState } from "react";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    preferredWorkouts: "",
    fitnessGoals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: profile.name,
      city: profile.location,
      preferredWorkout: profile.preferredWorkouts,
      fitnessGoals: profile.fitnessGoals,
    };

    const token = localStorage.getItem("jwtToken");

    fetch("https://b42-web-075-ui-unicorns-1.onrender.com/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Profile submitted successfully!");
        } else {
          console.error("Error submitting profile:", response.status);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/background-line-gradient-luxury-style_483537-3308.jpg?ga=GA1.1.2144125845.1737116705&semt=ais_hybrid')",
      }}
    >
      <div
        className="bg-white/80 backdrop-blur-lg p-10 rounded-lg shadow-lg max-w-lg w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/camera-accessories-arranged-concrete-background_23-2148038945.jpg?ga=GA1.1.2144125845.1737116705&semt=ais_hybrid')",
        }}
      >
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
            <label className="text-black block mb-1">Location:</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-black placeholder-gray-700 focus:ring focus:ring-blue-300 outline-none backdrop-blur-lg"
              placeholder="Enter your location"
            />
          </div>
          <div>
            <label className="text-black block mb-1">Preferred Workouts:</label>
            <select
              name="preferredWorkouts"
              value={profile.preferredWorkouts}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-black focus:ring focus:ring-blue-300 outline-none cursor-pointer backdrop-blur-lg"
            >
              <option value="" className="bg-black text-white">
                Select
              </option>
              <option value="yoga" className="bg-black text-white">
                Yoga
              </option>
              <option value="running" className="bg-black text-white">
                Running
              </option>
              <option value="weightlifting" className="bg-black text-white">
                Weightlifting
              </option>
              <option value="cardio" className="bg-black text-white">
                Cardio
              </option>
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
              <option value="" className="bg-black text-white">
                Select
              </option>
              <option value="weight gain" className="bg-black text-white">
                Weight Gain
              </option>
              <option value="weight loss" className="bg-black text-white">
                Weight Loss
              </option>
              <option value="bulking" className="bg-black text-white">
                Bulking
              </option>
              <option value="flexibility" className="bg-black text-white">
                Flexibility
              </option>
              <option value="muscle build" className="bg-black text-white">
                Muscle Build
              </option>
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
  );
};

export default ProfileForm;
