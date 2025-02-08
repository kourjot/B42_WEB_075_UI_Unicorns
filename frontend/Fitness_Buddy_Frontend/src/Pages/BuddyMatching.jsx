import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from '../Components/Common/Navbar';

const CustomArrow = ({ className, style, onClick, isNext }) => (
  <div
    className={`${className} !bg-rose-500 hover:!bg-rose-600 transition-colors duration-200 before:!text-white`}
    style={{
      ...style,
      display: "block",
      borderRadius: "50%",
    }}
    onClick={onClick}
  />
);

const BuddyMatching = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBuddies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please log in first.");
        return;
      }
      const response = await axios.get(
        "https://b42-web-075-ui-unicorns-1.onrender.com/getBuddies",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching buddies:", error);
      alert("Failed to fetch buddy data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow isNext={true} />,
    prevArrow: <CustomArrow isNext={false} />,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Buddy Matching with Same Goals
        </h2>
        <div className="max-w-3xl mx-auto">
          <Slider {...settings} className="buddy-slider">
            {users.map((user) => (
              <div key={user.userId} className="px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={user.image || "https://via.placeholder.com/150"}
                      alt={user.name || "Buddy"}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {user.name}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="mr-2 text-rose-500"
                      />
                      <span>{user.city || "Location not provided"}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-rose-50 rounded-lg p-3">
                        <p className="text-rose-700 font-medium">
                          Fitness Goal: {user.fitnessGoals}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-700 font-medium">
                          Preferred Workout: {user.preferredWorkout}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BuddyMatching;