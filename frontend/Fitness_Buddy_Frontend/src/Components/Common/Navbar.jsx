import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand Name */}
        <div className="text-2xl font-bold tracking-wide text-blue-400">
          Fitness Buddy
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/home" className="hover:text-blue-400 transition duration-300">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-400 transition duration-300">
            About
          </NavLink>
          <NavLink to="/process" className="hover:text-blue-400 transition duration-300">
            Process
          </NavLink>
          <NavLink to="/profile" className="hover:text-blue-400 transition duration-300">
            Profile
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
