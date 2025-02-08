import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      console.error("❌ All fields are required!");
      return alert("Email and Password are required!");
    }

    console.log("📝 Form data before sending:", formData);

    try {
      const { success, error } = await login(formData);
      if (success) {
        console.log("✅ Login successful!");
        alert("Login successful! 🎉");
        navigate("/dashboard");
      } else {
        console.error("❌ Login failed:", error);
        setMessage(error);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/521/132/desktop-wallpaper-fitness-and-background-gym-black.jpg')",
      }}
    >
      <div className="bg-transparent backdrop-blur-md p-10 rounded-lg shadow-lg max-w-md w-full border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back!
        </h1>
        <p className="mt-2 text-center text-gray-300">Log in to continue</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-white/50 px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-white/50 px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Log In
          </button>

          <p className="text-center mt-2">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>

        {message && <p className="mt-2 text-center text-red-400">{message}</p>}

        <div className="mt-4 flex items-center justify-center">
          <span className="w-full border-t border-white/20"></span>
          <span className="mx-3 text-gray-400">Or</span>
          <span className="w-full border-t border-white/20"></span>
        </div>

        

        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
