import { useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  

  return (
    <AppContext.Provider value={{ navigate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
