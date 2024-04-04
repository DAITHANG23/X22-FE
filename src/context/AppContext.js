import React, { useState, useEffect, useContext, createContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const login = (token) => {
    setIsLogin(true);
    setToken(token);
    localStorage.setItem("token", token);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      setToken(token);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ isLogin, setIsLogin, token, setToken, login }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
