import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Navbar from "../Components/Common/Navbar";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createprofile");
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 text-gray-900 mt-20">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEIzDtTC5RbhzX0F7WZ-VPLjaMbe03r2wBIOvsT1WsXBwd4l8EmznjVrg&s"
            alt="Fitness Buddy Banner"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="text-lg mt-2 text-center px-4">
              Stay motivated, achieve goals, and find the perfect workout partner.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold text-center mb-6">What is FitnessBuddy?</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            FitnessBuddy is a platform that connects fitness enthusiasts with like-minded workout partners. 
            Whether you're into weightlifting, yoga, or running, our community-driven app helps you find support and stay consistent.
          </p>
        </div>

        {/* Image Gallery Carousel */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Gallery</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full max-w-4xl"
          >
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/27810159/pexels-photo-27810159/free-photo-of-a-barbell-on-the-floor-with-a-black-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Gym Equipment"
                className="w-full rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/15373906/pexels-photo-15373906/free-photo-of-men-filming-weightlifting-at-gym.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Weightlifting"
                className="w-full rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/4804306/pexels-photo-4804306.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Workout Session"
                className="w-full rounded-lg shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                alt="Running Track"
                className="w-full rounded-lg shadow-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-semibold">Join FitnessBuddy Today!</h2>
          <p className="mt-2 text-lg">Find your fitness partner and start achieving your goals together.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            onClick={handleClick}
          >
            Get Started
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default About;
