// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setloading]=useState(true);
  const navigate = useNavigate();

  // App load hone par localStorage se user set karo
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setloading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // ✅ sahi navigation
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout,loading,navigate}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside <AuthProvider />");
  }
  return context;
};
