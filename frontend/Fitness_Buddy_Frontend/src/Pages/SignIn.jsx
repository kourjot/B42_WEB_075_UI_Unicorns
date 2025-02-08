import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("Name, Email, and Password are required!");
      return;
    }

    try {
      const { success, error } = await signup(formData);
      if (success) {
        alert("Signup successful! 🎉");
        navigate("/home");
      } else {
        setMessage(error);
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
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
        <h1 className="text-3xl font-bold text-white text-center">Create an Account</h1>
        <p className="mt-2 text-center text-gray-300">Sign up to get started</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              className="mt-1 w-full rounded-md border border-white/50 px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:border-blue-400 focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
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
            className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="mt-2 text-center text-red-400">{message}</p>}

        <div className="mt-4 flex items-center justify-center">
          <span className="w-full border-t border-white/20"></span>
          <span className="mx-3 text-gray-400">Or</span>
          <span className="w-full border-t border-white/20"></span>
        </div>

        <button className="mt-4 flex w-full items-center justify-center rounded-md border border-white/50 px-4 py-2 hover:bg-white/10 text-white">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="mr-2 h-5 w-5"
          />
          Sign up with Google
        </button>

        <p className="mt-4 text-center text-gray-300">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
