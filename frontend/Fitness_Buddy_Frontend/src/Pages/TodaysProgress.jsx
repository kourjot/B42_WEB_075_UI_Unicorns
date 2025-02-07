import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TodaysProgress = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please log in first.");
        return;
      }

      try {
        const response = await axios.get(
          "https://b42-web-075-ui-unicorns-1.onrender.com/getworkoutdatafor-per-day",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          const workoutData = response.data;
          setData([
            {
              name: "Sunday",
              value: workoutData.totalWorkoutDuration,
              calories: workoutData.totalCaloriesBurned,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
        alert("Failed to fetch workout data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg">
        <div className="text-xl text-gray-600 font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg">
        <div className="text-lg text-gray-600">
          No data available for today's workout.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-transform duration-300 hover:shadow-xl mt-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Today's Progress
      </h2>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600 font-medium">Duration</div>
          <div className="text-2xl font-bold text-purple-700">
            {data[0].value} mins
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600 font-medium">Calories</div>
          <div className="text-2xl font-bold text-green-700">
            {data[0].calories} kcal
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gray-50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            barSize={100}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e0e0e0"
            />
            <XAxis
              dataKey="name"
              label={{ 
                value: "Day", 
                position: "insideBottom", 
                dy: 10,
                fill: "#4B5563" 
              }}
              tick={{ fill: "#4B5563" }}
            />
            <YAxis
              label={{ 
                value: "Metrics", 
                angle: -90, 
                position: "insideLeft",
                fill: "#4B5563" 
              }}
              tick={{ fill: "#4B5563" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                color: "#e6e6e6",
                borderRadius: "8px",
                padding: "12px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px"
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#8884d8" 
              name="Workout Duration (mins)"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="calories" 
              fill="#82ca9d" 
              name="Calories Burned"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 text-center">
        {data[0].value >= 30 ? (
          <p className="text-green-600 font-medium">
            🎯 Great work! You've hit your daily activity target!
          </p>
        ) : (
          <p className="text-blue-600 font-medium">
            💪 Keep moving! Every minute counts towards your goals.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodaysProgress;