import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import reservations from "../../../../api/reservations";

const Reservation = () => {
  const [dataResponse, setDataResponse] = useState([]);
  const token = localStorage.getItem("token");

  const detailStatus = (status) => {
    if (status === 0) return "Chờ xác nhận";
    if (status === 1) return "Đã xác nhận";
    if (status === 2) return "Đã checkin";
    if (status === 3) return "Đã checkout";
    if (status === 4) return "Đã hủy";
  };

  useEffect(() => {
    const getReservation = async () => {
      const tmp = await reservations.getEmployeeReservations(token);
      console.log(tmp.data.reservations);
      setDataResponse(tmp.data.reservations);
    };
    getReservation();
  }, [token]);

  return (
    <div className="ReservationContainer">
      <h2>Danh sách yêu cầu đặt bàn</h2>
      <div className="reservationAccept">
        {dataResponse.length === 0 && <p>Không có yêu cầu đặt bàn nào</p>}
        {dataResponse.map((i, index) => {
          if (
            i.status === 1 ||
            i.status === 2 ||
            i.status === 3 ||
            i.status === 4
          ) {
            return (
              <div key={index} className="reservationdetail">
                <div>Tên khách hàng: {i.name}</div>
                <div>Số điện thoại: {i.phoneNumber}</div>
                <div>Số lượng người: {i.people}</div>
                <div>Thời gian: {i.time}</div>
                <div>Trạng thái: {detailStatus(i.status)}</div>
                <div className="Buttondetail">
                  <button>Chi tiết</button>
                  {i.status === 1 && <button>Check In</button>}
                  {(i.status === 1 || i.status === 2) && (
                    <button>Check Out</button>
                  )}
                  {i.status === 0 && <button>Xác nhận</button>}
                  {i.status === 0 && <button>Hủy</button>}
                </div>
              </div>
            );
          } else return null;
        })}
      </div>
      <div className="line"></div>
      <div className="reservationNotAccept">
        <h2>Yêu cầu chưa xác nhận</h2>
        {dataResponse.length === 0 && <p>Không có yêu cầu đặt bàn nào</p>}
        {dataResponse.map((i, index) => {
          if (i.status === 0) {
            return (
              <div key={index} className="reservationdetail">
                <div>Tên khách hàng: {i.name}</div>
                <div>Số điện thoại: {i.phoneNumber}</div>
                <div>Số lượng người: {i.people}</div>
                <div>Thời gian: {i.time}</div>
                <div>Trạng thái: {detailStatus(i.status)}</div>
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default Reservation;
