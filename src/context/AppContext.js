import React, { useState, useEffect, useContext, createContext } from "react";

import axiosWrapper from "../utils/axios";
import accountApi from "../api/account";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(2);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (token, role) => {
    setRole(role);
    localStorage.setItem("token", token);
    axiosWrapper.defaults.headers["Authorization"] = `Bearer ${token}`;

    const dataResponse = await accountApi.getAccountCustomer();

    setCurrentUser(dataResponse);
    setIsLogin(true);
    setToken(token);
  };

  const logout = () => {
    setIsLogin(false);
    setToken("");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) login(token);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setToken,
        login,
        logout,
        role,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
