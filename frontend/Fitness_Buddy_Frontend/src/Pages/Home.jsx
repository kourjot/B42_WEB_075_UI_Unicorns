import React from "react";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/api/placeholder/1200/600",
      title: "Transform Your Life",
      subtitle: "Start your fitness journey today",
    },
    {
      image: "/api/placeholder/1200/600",
      title: "Expert Trainers",
      subtitle: "Get personalized guidance",
    },
    {
      image: "/api/placeholder/1200/600",
      title: "State-of-the-art Facilities",
      subtitle: "Train with the best equipment",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose FitTrack Pro?
            </h2>
            <p className="mt-4 text-gray-600">
              Track your progress, achieve your goals, and transform your life
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Activity className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Tracking</h3>
              <p className="text-gray-600">
                Track every aspect of your fitness journey with our
                comprehensive tools
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a community of like-minded individuals on their fitness
                journey
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Trophy className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achievement System</h3>
              <p className="text-gray-600">
                Earn rewards and track your milestones as you progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Membership Plans
            </h2>
            <p className="mt-4 text-gray-600">
              Choose the perfect plan for your fitness journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-4">
                $9.99<span className="text-base font-normal">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Basic workout tracking
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Progress charts
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Community access
                </li>
              </ul>
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Get Started
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">
                $19.99<span className="text-base font-normal">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Advanced tracking
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Custom workout plans
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Nutrition tracking
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Priority support
                </li>
              </ul>
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Get Started
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Elite</h3>
              <p className="text-4xl font-bold mb-4">
                $29.99<span className="text-base font-normal">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  All Pro features
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  1-on-1 coaching
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Custom meal plans
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                  Video analysis
                </li>
              </ul>
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold italic mb-4">
            "The only bad workout is the one that didn't happen."
          </p>
          <p className="text-lg">Start your transformation today</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
