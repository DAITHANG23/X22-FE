import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
//
import "./styles.css";
import SideBar from "./Components/SideBar/SideBar";
import MainAdmin from "./Components/MainAdmin/MainAdmin";
import RestaurantEdit from "./Components/RestaurantEdit";
import Employee from "./Components/Employee";
import Menu from "./Components/Menu";
import Reservation from "./Components/Reservation";
import Review from "./Components/Review";
//
const Admin = () => {
  const { role } = useAppContext();
  return (
    <div className="AdminContainer">
      <SideBar />
      <Routes>
        <Route path="/" element={<MainAdmin />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Review" element={<Review />} />
        {role === 0 && (
          <>
            <Route path="/restaurant" element={<RestaurantEdit />} />
            <Route path="/employee" element={<Employee />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default Admin;
