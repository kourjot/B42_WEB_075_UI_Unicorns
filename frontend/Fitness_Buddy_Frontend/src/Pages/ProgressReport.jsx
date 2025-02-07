import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Navbar from "../Components/Common/Navbar";
import TodaysProgress from "./TodaysProgress";


const ProgressReport = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please log in first.");
        return;
      }

      try {
        const response = await axios.get(
          "https://b42-web-075-ui-unicorns-1.onrender.com/weeklyProgress",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { data } = response.data;
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
        alert("Failed to fetch weekly progress. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-gray-600 font-semibold">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">
          No data available for weekly progress.
        </div>
      </div>
    );
  }

  const { totalCaloriesBurned, totalDuration } = data;

  const chartData = [
    {
      name: "Calories Burned",
      value: totalCaloriesBurned,
      color: "rgb(101, 139, 255)",
    },
    { name: "Duration (mins)", value: totalDuration, color: "#bfff00" },
  ];

  const chartData2 = [
    {
      name: "total",
      Calories: data.totalCaloriesBurned,
      Duration: data.totalDuration,
    },
  ];

  return (
    <>
    <Navbar />
    <TodaysProgress/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
           This Week Progress Report
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Activity Distribution
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      color: "#e6e6e6",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    payload={chartData.map(item => ({
                      value: `${item.name} (${item.value})`,
                      type: "circle",
                      color: item.color,
                    }))}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#e6e6e6"
                    animationDuration={1500}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Progress Comparison
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData2} barSize={100}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      color: "#e6e6e6",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Calories"
                    fill="rgb(101, 139, 255)"
                    name="Calories Burned"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="Duration"
                    fill="#bfff00"
                    name="Duration (mins)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        
        
        <SummarySection
          totalCalories={totalCaloriesBurned}
          totalDuration={totalDuration}
        />
      </div>
    </div>
    </>
  );
};

const SummarySection = ({ totalCalories, totalDuration }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Weekly Summary
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="text-sm text-blue-600 font-medium">Total Calories</div>
        <div className="text-2xl font-bold text-blue-700">{totalCalories}</div>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <div className="text-sm text-green-600 font-medium">Total Duration</div>
        <div className="text-2xl font-bold text-green-700">{totalDuration} mins</div>
      </div>
    </div>
    {totalCalories >= 5000 ? (
      <div className="text-lg text-green-600 font-medium text-center">
        🎉 Great job! You've exceeded your weekly goals!
      </div>
    ) : (
      <div className="text-lg text-blue-600 font-medium text-center">
        💪 Keep pushing! You're doing great!
      </div>
    )}
  </div>
);

export default ProgressReport;