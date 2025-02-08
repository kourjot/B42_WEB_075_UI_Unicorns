import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    preferredWorkouts: "",
    fitnessGoals: "",
    image: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("city", profile.location);
    formData.append("preferredWorkout", profile.preferredWorkouts);
    formData.append("fitnessGoals", profile.fitnessGoals);
    if (profile.image) {
      formData.append("image", profile.image);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://b42-web-075-ui-unicorns.onrender.com/createprofile",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: formData, // Using FormData
        }
      );

      if (response.ok) {
        alert("Profile submitted successfully!");
        navigate("/showprofile"); // Navigate without refresh
      } else {
        console.error("Error submitting profile:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <Navbar />
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

            {/* Image Upload */}
            <div>
              <label className="text-black block mb-1">Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded-md border border-white bg-transparent text-black focus:ring focus:ring-blue-300 outline-none backdrop-blur-lg"
              />
              {profile.image && (
                <img
                  src={URL.createObjectURL(profile.image)}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full border border-gray-300"
                />
              )}
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
      <Footer />
    </>
  );
};

export default ProfileForm;
