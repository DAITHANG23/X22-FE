import React, { useState } from "react";
import "./areservation.css";
import apiService from "../../api";
const Areservation = ({ reservation }) => {
  const {
    restaurantPhoneNumber,
    restaurantAddress,
    restaurantName,
    name,
    people,
    note,
  } = reservation;
  const statusMap = {
    0: "Chờ xác nhận",
    1: "Đã xác nhận",
    2: "Đã check in",
    3: "Đã hoàn thành",
    4: "Đã hủy",
  };
  const [status, setStatus] = useState(reservation.status);
  const [statusString, setStatusString] = useState(statusMap[status]);

  const handleCancel = () => {
    apiService.reservations
      .cancelReservation(reservation._id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setStatus(4);
          setStatusString("Đã hủy");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AreservationContainer">
      <h1>Tên người đặt: {name}</h1>
      <h2>Tên nhà hàng: {restaurantName}</h2>
      <p>Địa chỉ nhà hàng: {restaurantAddress}</p>
      <p> Số điện thoại liên hệ: {restaurantPhoneNumber}</p>
      <p>Số lượng người: {people}</p>
      {note && <p>Ghi chú: {note}</p>}
      <p>Trạng thái: {statusString}</p>
      {status === 0 && <button onClick={handleCancel}>Hủy</button>}
    </div>
  );
};

export default Areservation;
