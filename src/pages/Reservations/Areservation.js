import React, { useState } from "react";
import "./areservation.css";
import apiService from "../../api";
import moment from "moment";
//
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
//

const Areservation = ({ reservation }) => {
  //
  const {
    restaurantPhoneNumber,
    restaurantAddress,
    restaurantName,
    name,
    people,
    note,
    time,
  } = reservation;
  const statusMap = {
    0: "Chờ xác nhận",
    1: "Đã xác nhận",
    2: "Đã check in",
    3: "Đã hoàn thành",
    4: "Đã hủy",
  };
  const formattedTime = moment(time).format("HH:mm");
  //
  const [status, setStatus] = useState(reservation.status);
  const [statusString, setStatusString] = useState(statusMap[status]);
  //
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
      <h1 className="AReservationTitle">
        <AccountCircleIcon color="secondary" /> {name}
      </h1>
      <h2 className="AReservationRestaurant">
        <RestaurantIcon color="secondary" /> {restaurantName}
      </h2>
      <div className="AReservationDetail">
        <p>
          <HomeIcon color="secondary" /> {restaurantAddress}
        </p>
        <p>
          <LocalPhoneIcon color="secondary" /> {restaurantPhoneNumber}
        </p>
        <p>
          <GroupsIcon color="secondary" /> {people} người
        </p>
        <p>
          <AccessTimeIcon color="secondary" /> {formattedTime}
        </p>
        {note && <p>Ghi chú: {note}</p>}
      </div>
      <div className="AReservationStatus">
        <span className="StatusString"> {statusString}</span>
        {status === 0 && (
          <button className="buttonCancelARS" onClick={handleCancel}>
            Hủy đặt bàn
          </button>
        )}
      </div>
    </div>
  );
};

export default Areservation;
