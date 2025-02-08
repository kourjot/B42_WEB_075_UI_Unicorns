import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import logo from "../../assets/media/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("🚪 Logging out user"); 
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/landingpage"); 
  };

  // Active link style function
  const navLinkStyles = ({ isActive }) => {
    return isActive 
      ? "text-blue-400 font-medium border-b-2 border-blue-400"
      : "hover:text-blue-400 transition duration-300";
  };

  // Mobile active link style function
  const mobileNavLinkStyles = ({ isActive }) => {
    return `block px-2 py-2 rounded transition duration-300 ${
      isActive 
        ? "bg-blue-500 text-white font-medium"
        : "hover:bg-gray-800"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Name */}
          <div className="flex justify-center items-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="h-12 w-auto object-contain hover:opacity-90 transition-all duration-300 
              hover:scale-105 mb-2"
                      />
                    </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6">
            <NavLink to="/home" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About
            </NavLink>
            <NavLink to="/bmi" className={navLinkStyles}>
              Check BMI
            </NavLink>
            <NavLink to="/workoutupdate" className={navLinkStyles}>
              Add Workout
            </NavLink>
            <NavLink to="/progressreport" className={navLinkStyles}>
              Your Progress
            </NavLink>
            <NavLink to="/buddymatching" className={navLinkStyles}>
              Buddy Matching
            </NavLink>
            <NavLink to="/profile" className={navLinkStyles}>
              Profile
            </NavLink>
          </div>

          {/* Logout Button - Hidden on Mobile */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none hover:text-blue-400 transition duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden mt-4 pb-4 space-y-3`}
        >
          <NavLink
            to="/home"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/bmi"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Check BMI
          </NavLink>
          <NavLink
            to="/workoutupdate"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Add Workout
          </NavLink>
          <NavLink
            to="/progressreport"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Your Progress
          </NavLink>
          <NavLink
            to="/profile"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>
          
          {/* Mobile Logout Button */}
          <button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;