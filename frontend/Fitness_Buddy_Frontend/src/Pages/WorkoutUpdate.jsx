import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Common/Navbar";


const WorkoutUpdate = () => {
  const exerciseTypes = ["running", "weightlifting", "yoga", "cardio"];

  const [workoutData, setWorkoutData] = useState({
    preferredWorkout: "",
    workoutDuration: 0,
  });

  const handleWorkoutChange = (field, value) => {
    setWorkoutData((prev) => ({
      ...prev,
      [field]: field === "workoutDuration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(workoutData);
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    if (workoutData.workoutDuration <= 0) {
      alert("Workout duration must be greater than 0.");
      return;
    }

    try {
      const response = await axios.post(
        "https://b42-web-075-ui-unicorns-1.onrender.com/workoutUpdate",
        {
          preferredWorkout: workoutData.preferredWorkout,
          workoutDuration: workoutData.workoutDuration,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Workout tracked successfully!");
        setWorkoutData({
          preferredWorkout: "",
          workoutDuration: 0,
        });
      }
    } catch (error) {
      console.error("Error tracking workout:", error);
      alert("Failed to track workout. Please try again.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 mt-18" >
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Today's Workout 
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
            
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Exercise Type:
              </label>
              <select
                value={workoutData.preferredWorkout}
                onChange={(e) =>
                  handleWorkoutChange("preferredWorkout", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          transition-all duration-200 text-gray-800
                          shadow-sm"
              >
                <option value="" className="text-gray-500">
                  -- Select Exercise --
                </option>
                {exerciseTypes.map((type, i) => (
                  <option 
                    key={i} 
                    value={type}
                    className="py-2 text-gray-800 capitalize"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Duration (mins):
              </label>
              <input
                type="number"
                placeholder="Enter duration"
                value={workoutData.workoutDuration}
                onChange={(e) =>
                  handleWorkoutChange("workoutDuration", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          transition-all duration-200 text-gray-800
                          shadow-sm placeholder-gray-400"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                       text-white font-semibold rounded-lg shadow-sm
                       transform transition-all duration-200
                       hover:shadow-md hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              Track Workout
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default WorkoutUpdate;