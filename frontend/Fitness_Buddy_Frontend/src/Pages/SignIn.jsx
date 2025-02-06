import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginbanner from "../assets/media/loginbanner.jpg";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value); // Debugging log to track input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("📝 Form data before validation:", formData); // Log form data before validation

    // Input Validation
    if (!formData.username || !formData.email || !formData.password) {
      console.error("❌ All fields are required!");
      alert("Name, Email, and Password are required!");
      return;
    }

    console.log("📝 Form data before sending:", formData);

    try {
      const { success, error } = await signup(formData);
      if (success) {
        console.log("✅ Signup successful!");
        alert("Signup successful! 🎉");
        navigate("/home");
      } else {
        console.error("❌ Signup failed:", error);
        setMessage(error);
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Left Side - Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-black">Create an Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
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
              className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Sign Up
            </button>
          </form>

          {message && (
            <p className="mt-2 text-center text-red-500">
              {message}
            </p>
          )}

          <div className="mt-4 flex items-center justify-center">
            <span className="w-full border-t"></span>
            <span className="mx-3 text-gray-400">Or </span>
            <span className="w-full border-t"></span>
          </div>

          <button className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="mr-2 h-5 w-5"
            />
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
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

export default SignIn;
