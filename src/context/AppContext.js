import React, { useState, useEffect, useContext, createContext } from "react";

import axiosWrapper from "../utils/axios";
import accountApi from "../api/account";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(2);
  const [currentUser, setCurrentUser] = useState(null);
  const [idRestaurant, setIdRestaurant] = useState(null);

  const login = async (token) => {
    localStorage.setItem("token", token);
    axiosWrapper.defaults.headers["Authorization"] = `Bearer ${token}`;
    const dataResponse = await accountApi.getAccountCustomer();
    setCurrentUser(dataResponse);
    setRole(dataResponse?.role);
    setIsLogin(true);
    setToken(token);
    setIdRestaurant(dataResponse?.idRestaurant);
  };

  const logout = () => {
    setIsLogin(false);
    setToken("");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  const refeshToken = async () => {
    const token = localStorage.getItem("token");
    if (token) login(token);
  };
  useEffect(() => {
    refeshToken();
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
        idRestaurant,
        refeshToken,
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
