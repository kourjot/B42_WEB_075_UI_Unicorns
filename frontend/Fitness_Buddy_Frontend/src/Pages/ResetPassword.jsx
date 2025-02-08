import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://b42-web-075-ui-unicorns-1.onrender.com/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailFromState, otp, newPassword }),
        }
      );

      if (response.ok) {
        alert("Password reset successful! Redirecting to login...");
        navigate("/login"); 
      } else {
        alert("Invalid OTP or error resetting password.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 block mb-1">Email:</label>
            <input
              type="email"
              value={emailFromState}
              disabled
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-200 text-black"
            />
          </div>
          <div>
            <label className="text-gray-700 block mb-1">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-black placeholder-gray-600 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter OTP"
            />
          </div>
          <div>
            <label className="text-gray-700 block mb-1">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-black placeholder-gray-600 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
