import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("🔒 ProtectedRoute - User:", user);
  console.log("🔒 ProtectedRoute - Loading:", loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("🚫 No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;