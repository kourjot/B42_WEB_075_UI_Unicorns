import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return null;
      const parsedUser = JSON.parse(storedUser);
      console.log("🔍 Found user in localStorage:", parsedUser);
      return parsedUser;
    } catch (error) {
      console.error("❌ Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // 🚀 Signup Function
  const signup = async ({ username, email, password }) => {
    try {
      console.log("🔄 Sending signup request:", { username, email, password });

      const response = await axios.post("https://b42-web-075-ui-unicorns-1.onrender.com/signin", {
        username,
        email,
        password,
      });

      console.log("✅ Signup success:", response.data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true, data: response.data };
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Signup failed" };
    }
  };

  // 🚀 Login Function
  const login = async ({ email, password }) => {
    try {
      console.log("🔄 Sending login request:", { email, password });

      const response = await axios.post("https://b42-web-075-ui-unicorns-1.onrender.com/login", {
        email,
        password,
      });

      console.log("✅ Login success:", response.data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  };

  // 🚀 Logout Function
  const logout = () => {
    console.log("🚪 Logging out user");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Check for user in localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("🔍 Found user in localStorage:", parsedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("❌ Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);