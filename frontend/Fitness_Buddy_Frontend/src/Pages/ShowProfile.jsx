import React, { useEffect, useState } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const ShowProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://b42-web-075-ui-unicorns.onrender.com/getProfile",
          {
            headers: { Authorization: `${token}` },
          }
        );
        console.log(response)
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/darkroom-concrete-floor-with-foggy-effect-stage-background-product_84443-7819.jpg')",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4 text-black">
            Profile Details
          </h2>
          {loading ? (
            <p className="text-center text-black">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : profile ? (
            <div className="space-y-3 text-center">
              {/* Fix: Changed `profile.image` to `profile.profileImage` */}
              {profile.profileImage && (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full border border-gray-300 object-cover shadow-md"
                />
              )}
              <p className="text-lg text-black">
                <strong>Name:</strong> {profile.name}
              </p>
              <p className="text-lg text-black">
                <strong>Location:</strong> {profile.city}
              </p>
              <p className="text-lg text-black">
                <strong>Preferred Workouts:</strong> {profile.preferredWorkout}
              </p>
              <p className="text-lg text-black">
                <strong>Fitness Goals:</strong> {profile.fitnessGoals}
              </p>
            </div>
          ) : (
            <p className="text-center text-black">No profile found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowProfile;
