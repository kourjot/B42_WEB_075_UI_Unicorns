import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginbanner from "../assets/media/loginbanner.jpg";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Left Side - Form */}
        <div className="w-1/2 p-10">
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
            <p className="text-center mt-2">
  <a href="/forgot-password" className="text-blue-600 hover:underline">
    Forgot Password?
  </a>
</p>

          </form>

          {message && <p className="mt-2 text-center text-red-500">{message}</p>}

          <div className="mt-4 flex items-center justify-center">
            <span className="w-full border-t"></span>
            <span className="mx-3 text-gray-400">Or</span>
            <span className="w-full border-t"></span>
          </div>

          <button className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="mr-2 h-5 w-5"
            />
            Log in with Google
          </button>

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