import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext"; // Ensure this is correctly imported

import { ProtectedRoute } from "./Components/Common/ProtectedRoute"; // If needed
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import Dashboard from "./Components/Common/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import About from "./Pages/About";
import ProfileForm from "./Pages/ProfileForm";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import BmiCalculator from "./Pages/BmiCalculator";
import WorkoutUpdate from "./Pages/WorkoutUpdate";
import ProgressReport from "./Pages/ProgressReport";

// Create a separate component for the root route
const RootRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return user ? <Navigate to="/home" replace /> : <Navigate to="/landingpage" replace />;

};

const App = () => {
  return (
    <>
    {/* <Navbar/> */}
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route
            path="/home"
            element={
             
                <Home />
              
            }
          />
          {/* Root route using the new component */}
          <Route path="/" element={<RootRoute />} />
          {/* Catch all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
};

export default App;
