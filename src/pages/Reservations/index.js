import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAppContext } from "../../context/AppContext";
import apiService from "../../api";
import Areservation from "./Areservation";

const Reservations = () => {
  const { token, isLogin } = useAppContext();
  const [dataReservations, setDataReservations] = useState([]);
  const [Error, setError] = useState("");

  useEffect(() => {
    if (isLogin) {
      apiService.reservations
        .getReservations(token)
        .then((res) => {
          setDataReservations(res.data.reservations);
        })
        .catch((errors) => {
          console.log(errors);
          if (errors.response.data.error === "Unauthorized")
            setError("Bạn chưa đăng nhập");
        });
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
        <h3 className="Error" style={{ color: "red" }}>
          {Error}
        </h3>
      </div>
      {!isLogin && (
        <h3 className="Error" style={{ color: "red" }}>
          Bạn chưa đăng nhập
        </h3>
      )}
    </div>
  );
};

export default Reservations;
