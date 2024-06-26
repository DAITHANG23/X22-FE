import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
//
import "./styles.css";
import SideBar from "./Components/SideBar/SideBar";
import MainAdmin from "./Components/MainAdmin/MainAdmin";
import Employee from "./Components/Employee";
import Menu from "./Components/Menu";
import Reservation from "./Components/Reservation";
import Review from "./Components/Review";
//
const Admin = () => {
  const { role, idRestaurant } = useAppContext();
  console.log(idRestaurant);
  return (
    <div className="AdminContainer">
      <div className="Containernone"></div>
      <SideBar />
      <Routes>
        <Route path="/" element={<MainAdmin />} />
        {idRestaurant && <Route path="/Menu" element={<Menu />} />}
        {idRestaurant && (
          <Route path="/Reservation" element={<Reservation />} />
        )}
        {idRestaurant && <Route path="/Review" element={<Review />} />}
        {role === 0 && (
          <>
            {idRestaurant && <Route path="/employee" element={<Employee />} />}
          </>
        )}
      </Routes>
    </div>
  );
};

export default Admin;
