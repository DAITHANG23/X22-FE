import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAppContext } from "../../context/AppContext";
import apiService from "../../api";
import Areservation from "./Areservation";

const Reservations = () => {
  const { token, isLogin } = useAppContext();
  const [dataReservations, setDataReservations] = useState([]);

  useEffect(() => {
    if (isLogin) {
      apiService.reservations
        .getReservations(token)
        .then((res) => {
          setDataReservations(res.data.reservations);
        })
        .catch((error) => console.log(error));
    }
  }, [isLogin, token]);

  return (
    <div className="ReservationsContainer">
      <h3 className="ReservationsTitle">Danh sách yêu cầu đặt bàn</h3>
      <div className="ReservationsMap">
        {isLogin &&
          dataReservations.map((reservation, index) => (
            <Areservation reservation={reservation} key={index} />
          ))}
      </div>
      {!isLogin && <div>Bạn chưa đăng nhập</div>}
    </div>
  );
};

export default Reservations;
