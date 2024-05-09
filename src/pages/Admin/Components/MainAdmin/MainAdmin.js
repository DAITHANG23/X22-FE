import React, { useState } from "react";
import useGetRestaurantDetails from "../../../Dashboard/hooks/useGetRestaurantDetail.js";
import { useAppContext } from "../../../../context/AppContext.js";
import DialogCreateRestaurant from "../dialogCreateRestaurant/index.js";
import DialogEditRestaurant from "../dialogEditRestaurant/index.js";
import Datbantheongay from "./Graph/datban_theongay.js";
import Datbantheothang from "./Graph/datban_theothang.js";
import Doanhthutheothang from "./Graph/doanhthu_theothang.js";
import Doanhthutheongay from "./Graph/doanhthu_theongay.js";
import "./index.css";

const MainAdmin = () => {
  const { idRestaurant, role } = useAppContext();
  const { restaurantDetailData } = useGetRestaurantDetails(idRestaurant);
  console.log(restaurantDetailData);

  const { name, phoneNumber, address, images, timeStart, timeEnd } =
    restaurantDetailData || {};
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleClickOpenDialogCreate = () => {
    setOpenDialogCreate(true); // Open the dialog
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false); // Close the dialog
  };

  const handleClickOpenDialogEdit = () => {
    setOpenDialogEdit(true); // Open the dialog
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false); // Close the dialog
  };
  return (
    <div className="MainAdminContainer">
      {!idRestaurant && (
        <div>
          <h1>Bạn chưa đăng kí nhà hàng</h1>
          {role === 0 && (
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={handleClickOpenDialogCreate}
            >
              Thêm Nhà Hàng
            </button>
          )}

          <DialogCreateRestaurant
            idRestaurant={idRestaurant}
            open={openDialogCreate} // Pass the open state to the dialog component
            handleClose={handleCloseDialogCreate} // Pass the close function to the dialog component
          />
        </div>
      )}
      {idRestaurant && (
        <div className="AdminContent">
          <h1>Thông tin nhà hàng</h1>
          <div className="RestaurantDetail">
            <div className="RestaurantDetailInfo">
              <h3>
                Nhà hàng: <span>{name}</span>
              </h3>
              <p>Số điện thoại: {phoneNumber}</p>
              <p>Địa chỉ: {address}</p>
              <p>
                Giờ làm việc: {timeStart} - {timeEnd}
              </p>
            </div>
          </div>
          {role === 2 && (
            <button onClick={handleClickOpenDialogEdit}>Sửa thông tin</button>
          )}

          <DialogEditRestaurant
            idRestaurant={idRestaurant}
            open={openDialogEdit} // Pass the open state to the dialog component
            handleClose={handleCloseDialogEdit} // Pass the close function to the dialog component
          />
          <div className="AdminGraph">
            <div className="AdminGraphItem">
              <Datbantheongay />
            </div>
            <div className="AdminGraphItem">
              <Datbantheothang />
            </div>
            <div className="AdminGraphItem">
              <Doanhthutheongay />
            </div>
            <div className="AdminGraphItem">
              <Doanhthutheothang />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAdmin;
