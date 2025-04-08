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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/darkroom-concrete-floor-with-foggy-effect-stage-background-product_84443-7819.jpg')",
      }}
    >
      <div className="bg-transparent backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-1">Email:</label>
            <input
              type="email"
              value={emailFromState}
              disabled
              className="w-full p-2 rounded-md border border-white bg-transparent text-white placeholder-gray-300 focus:ring focus:ring-blue-300 outline-none backdrop-blur-md"
            />
          </div>
          <div>
            <label className="text-white block mb-1">OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-white placeholder-gray-300 focus:ring focus:ring-blue-300 outline-none backdrop-blur-md"
              placeholder="Enter OTP"
            />
          </div>
          <div>
            <label className="text-white block mb-1">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-white placeholder-gray-300 focus:ring focus:ring-blue-300 outline-none backdrop-blur-md"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-transparent text-white border border-white py-2 rounded-md transition duration-300 cursor-pointer hover:bg-blue-500 hover:border-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
