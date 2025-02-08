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
      <div
        className="bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-900 block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-white bg-transparent text-black placeholder-gray-700 focus:ring focus:ring-blue-300 outline-none backdrop-blur-lg"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-transparent text-black border border-white py-2 rounded-md transition duration-300 cursor-pointer hover:bg-white/10 backdrop-blur-lg"
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
