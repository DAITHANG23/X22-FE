import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";

const SideBar = () => {
  const { role } = useAppContext();
  return (
    <div className="SideBarContainer">
      <Link to="/admin">Quản lý nhà hàng</Link>
      {role === 0 && (
        <>
          <Link to="/admin/restaurant">Chỉnh sửa thông tin nhà hàng</Link>
          <Link to="/admin/employee">Quản lý nhân viên</Link>
        </>
      )}
      <Link to="/admin/menu">Quản lý menu</Link>
      <Link to="/admin/reservation">Quản lý đặt bàn</Link>
      <Link to="/admin/review">Quản lý đánh giá</Link>
    </div>
  );
};

export default SideBar;
