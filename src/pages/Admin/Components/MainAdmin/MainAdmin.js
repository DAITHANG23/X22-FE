import React from "react";
import useGetRestaurantDetails from "../../../Dashboard/hooks/useGetRestaurantDetail.js";
import { useAppContext } from "../../../../context/AppContext.js";
const MainAdmin = () => {
  const { idRestaurant } = useAppContext();
  const { restaurantDetailData } = useGetRestaurantDetails(idRestaurant);
  const { name, phoneNumber, address, images } = restaurantDetailData || {};
  return (
    <div className="MainAdminContainer">
      {!idRestaurant && <h1>Bạn chưa đăng kí nhà hàng</h1>}
      {idRestaurant && (
        <div className="AdminContent">
          <h1>Quản lý nhà hàng</h1>
          <div className="RestaurantDetail">
            <div className="RestaurantDetailImage">
              <img src={images} alt="restaurant" />
            </div>
            <div className="RestaurantDetailInfo">
              <h3>Nhà hàng:{name}</h3>
              <p>Số điện thoại: {phoneNumber}</p>
              <p>Địa chỉ: {address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAdmin;
