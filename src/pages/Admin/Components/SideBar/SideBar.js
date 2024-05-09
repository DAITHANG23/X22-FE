import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BadgeIcon from "@mui/icons-material/Badge";
import TableBarIcon from "@mui/icons-material/TableBar";
import ReviewsIcon from "@mui/icons-material/Reviews";
const SideBar = () => {
  const { role, idRestaurant } = useAppContext();
  return (
    <div className="SideBarContainer">
      <Link to="/admin">
        <TableRestaurantIcon />
        <p>Quản lý nhà hàng</p>
      </Link>
      {role === 0 && (
        <>
          {idRestaurant && (
            <Link to="/admin/employee">
              <BadgeIcon />
              <p>Quản lý nhân viên</p>
            </Link>
          )}
        </>
      )}
      {idRestaurant && (
        <Link to="/admin/menu">
          <RestaurantIcon />
          <p>Quản lý menu</p>
        </Link>
      )}
      {idRestaurant && (
        <Link to="/admin/reservation">
          <TableBarIcon />
          <p>Quản lý đặt bàn</p>
        </Link>
      )}
      {idRestaurant && (
        <Link to="/admin/review">
          <ReviewsIcon />
          <p>Quản lý đánh giá</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
