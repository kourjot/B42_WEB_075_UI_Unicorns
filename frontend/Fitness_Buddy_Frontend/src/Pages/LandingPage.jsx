import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  ChevronRight,
  Target,
  Users,
  Medal,
  Clock,
  PersonStanding,
  Activity,
} from "lucide-react";
import video1 from "../assets/media/video1.mp4";
import video2 from "../assets/media/video2.mp4";
import video3 from "../assets/media/video3.mp4";
import video4 from "../assets/media/video4.mp4";
import video11 from "../assets/media/video11.mp4";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/media/logo.png";
const LandingPage = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeText, setActiveText] = useState(0);
  const videoRefs = useRef([]);
  const heroVideoRef = useRef(null);
  const videos = [video1, video2, video3, video4];

  const navigate = useNavigate();
  const heroTexts = [
    "Health is Wealth",
    "Transform Your Life",
    "Push Your Limits",
    "Achieve Greatness",
  ];

  const quotes = [
    {
      text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
      author: "Jot Kaur",
    },
    {
      text: "The only bad workout is the one that didn't happen.",
      author: "Harshit Mittal",
    },
    {
      text: "You Can't gain Weight By Yoga.",
      author: "Suraj Bakchi",
    },
    {
      text: "Your body can stand almost anything. It's your mind that you have to convince.",
      author: "Ataf Khan",
    },
  ];

  const features = [
    {
      icon: <PersonStanding className="text-green-500 w-12 h-12" />,
      title: "Personalized Training",
      description:
        "Custom workout plans tailored to your fitness level and goals.",
    },
    {
      icon: <Users className="text-green-500 w-12 h-12" />,
      title: "Expert Coaches",
      description: "Professional trainers providing personalized guidance.",
    },
    {
      icon: <Activity className="text-green-500 w-12 h-12" />,
      title: "Progress Tracking",
      description: "Advanced metrics to monitor your fitness journey.",
    },
    {
      icon: <Medal className="text-green-500 w-12 h-12" />,
      title: "Achievement Rewards",
      description: "Motivational challenges and milestone celebrations.",
    },
  ];

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play();
    }

    const textInterval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideo];

    const playCurrentVideo = async () => {
      try {
        if (currentVideo) {
          await currentVideo.play();
        }
      } catch (error) {
        console.error("Video play error:", error);
      }
    };

    const cycleVideos = () => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    };

    playCurrentVideo();
    const timer = setTimeout(cycleVideos, 5000);

    return () => {
      clearTimeout(timer);
      videos.forEach((video) => {
        const videoEl = videoRefs.current.find((ref) =>
          ref.src.includes(video)
        );
        if (videoEl) videoEl.pause();
      });
    };
  }, [activeVideo]);

  return (
    <div className="bg-gray-900 text-white">
     <div className="sticky top-0 z-50 flex bg-gray-800 py-4 shadow-sm">
  <img 
    src={logo} 
    alt="logo" 
    className="h-12 w-auto ml-4 object-contain hover:opacity-90 transition-all duration-300 hover:scale-105"
  />
</div>
      {/* Hero Video Section */}
      <div className="relative h-screen w-full overflow-hidden">
        
        <video
          ref={heroVideoRef}
          src={video11}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-6xl font-bold text-white transition-all duration-500 transform"
            style={{
              opacity: 1,
              transform: `translateY(${activeText === 0 ? "0" : "20px"})`,
            }}
          >
            {heroTexts[activeText]}
          </h1>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <a
            href="/login"
            className="bg-green-600 text-white px-8 py-3 rounded-full 
            flex items-center hover:bg-green-700 transition group"
          >
            Get Started
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
          </a>
        </div>
      </div>

      {/* Quotes Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Inspirational Quotes
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <p className="italic text-lg mb-4">"{quote.text}"</p>
              <p className="text-right text-green-500 font-semibold">
                - {quote.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Video Section */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl flex items-center space-x-12">
          <div className="w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              Transform Your <span className="text-green-500">Body</span>,
              Elevate Your <span className="text-green-500">Life</span>
            </h1>
            <p className="text-xl text-gray-300">
              Personalized fitness training that adapts to your goals.
            </p>

            <a
              href="/login"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full 
             hover:bg-green-700 transition group w-fit"
            >
              Get Started
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
            </a>
          </div>

          <div className="w-1/2 relative h-[500px]">
            {videos.map((videoSrc, index) => (
              <video
                key={index}
                ref={(el) => (videoRefs.current[index] = el)}
                src={videoSrc}
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-2xl shadow-2xl 
                  transition-opacity duration-500 ${
                    activeVideo === index ? "opacity-100" : "opacity-0"
                  }`}
                muted
                playsInline
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-8 py-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
