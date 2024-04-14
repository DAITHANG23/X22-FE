import React, { useState, useEffect, useContext, createContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(2);
  const login = (token, role) => {
    setRole(role);
    setIsLogin(true);
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setIsLogin(false);
    setToken("");
    localStorage.removeItem("token");
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
      value={{ isLogin, setIsLogin, token, setToken, login, logout, role }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
