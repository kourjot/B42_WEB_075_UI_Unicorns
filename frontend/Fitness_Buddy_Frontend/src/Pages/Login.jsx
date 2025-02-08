import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginbanner from "../assets/media/loginbanner.jpg";
import logo from "../assets/media/logo.png";
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

    // 🚀 Input Validation
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
        navigate("/home");
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Left Side - Form */}
        <div className="w-1/2 p-10">
          <div className="flex justify-center items-center">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto object-contain hover:opacity-90 transition-all duration-300 
    hover:scale-105 mb-2"
            />
          </div>
          <h1 className="text-3xl font-bold text-black">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">Log in to continue</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
          </form>

          {message && (
            <p className="mt-2 text-center text-red-500">{message}</p>
          )}

          

          

          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-1/2 bg-indigo-100 p-10 flex flex-col items-center justify-center">
          <img
            src={loginbanner}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
          <p className="mt-4 text-center text-gray-700">
            Join Tasky today and manage your tasks efficiently!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
