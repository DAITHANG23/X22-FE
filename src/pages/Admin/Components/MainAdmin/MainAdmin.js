import React, { useState } from "react";
import useGetRestaurantDetails from "../../../Dashboard/hooks/useGetRestaurantDetail.js";
import { useAppContext } from "../../../../context/AppContext.js";
import DialogCreateRestaurant from "../dialogCreateRestaurant/index.js";
import DialogEditRestaurant from "../dialogEditRestaurant/index.js";

const MainAdmin = () => {
  const { idRestaurant } = useAppContext();
  const { restaurantDetailData } = useGetRestaurantDetails(idRestaurant);
  console.log(restaurantDetailData);

  const { name, phoneNumber, address, images } = restaurantDetailData || {};
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
          <button onClick={handleClickOpenDialogCreate}>Thêm Nhà Hàng</button>
          <DialogCreateRestaurant
            idRestaurant={idRestaurant}
            open={openDialogCreate} // Pass the open state to the dialog component
            handleClose={handleCloseDialogCreate} // Pass the close function to the dialog component
          />
        </div>
      )}
      {idRestaurant && (
        <div className="AdminContent">
          <h1>Quản lý nhà hàng</h1>
          <div className="RestaurantDetail">
            {/* <div className="RestaurantDetailImage">
              <img src={images[0]} alt="restaurant" />
            </div> */}
            <div className="RestaurantDetailInfo">
              <h3>Nhà hàng:{name}</h3>
              <p>Số điện thoại: {phoneNumber}</p>
              <p>Địa chỉ: {address}</p>
            </div>
          </div>
          <button onClick={handleClickOpenDialogEdit}>Sửa thông tin</button>
          <DialogEditRestaurant
            idRestaurant={idRestaurant}
            open={openDialogEdit} // Pass the open state to the dialog component
            handleClose={handleCloseDialogEdit} // Pass the close function to the dialog component
          />
        </div>
      )}
    </div>
  );
};

export default MainAdmin;
