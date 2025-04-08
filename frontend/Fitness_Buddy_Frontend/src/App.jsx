import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./Components/Common/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
// import Navbar from './Navbar'
import Dashboard from "./Components/Common/Dashboard";
import Footer from "./Components/Common/Footer";
import About from "./Pages/About";
import BmiCalculator from "./Pages/BmiCalculator";
import WorkoutUpdate from "./Pages/WorkoutUpdate";
import ProgressReport from "./Pages/ProgressReport";
import LandingPage from "./Pages/LandingPage";
import BuddyMatching from "./Pages/BuddyMatching";

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

  return <Navigate to={user ? "/home" : "/landingpage"} replace />;
};

const App = () => {
  return (
    <>
    {/* <Navbar/> */}
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/bmi' element={<BmiCalculator/>}/>
          <Route path='/workoutupdate' element={<WorkoutUpdate/>}/>
          <Route path='/progressreport' element={<ProgressReport/>}/>
          <Route path='/footer' element={<Footer/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/landingpage' element={<LandingPage/>}/>
          <Route path='/buddymatching' element={<BuddyMatching/>}/>
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