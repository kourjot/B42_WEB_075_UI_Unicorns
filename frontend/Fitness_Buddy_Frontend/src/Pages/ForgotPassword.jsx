import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://b42-web-075-ui-unicorns-1.onrender.com/forgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        navigate("/reset-password", { state: { email } });
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }

    setLoading(false);
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
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-white placeholder-gray-300 focus:ring focus:ring-blue-300 outline-none backdrop-blur-md"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-transparent text-white border border-white py-2 rounded-md transition duration-300 cursor-pointer hover:bg-blue-500 hover:border-blue-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
