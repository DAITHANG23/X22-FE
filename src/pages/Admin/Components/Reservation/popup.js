import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import reservations from "../../../../api/reservations";
import { useAppContext } from "../../../../context/AppContext";
const PopUp = ({ setPopup, id, type }) => {
  const { token } = useAppContext();
  const [reservation, setReservation] = useState({});
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const getReservations = async () => {
    const response = await reservations.getReservationsById(id);
    setReservation(response.data.reservation);
    setMenu(response.data.menu);
    setTables(response.data.tables);
  };
  useEffect(() => {
    getReservations();
  }, []);
  const handleCheckin = async () => {
    const res = await reservations.CheckIn(token, id);
    setPopup(false);
  };
  const handleCheckOut = async () => {
    const res = await reservations.CheckOut(token, id);
    setPopup(false);
  };
  const handleConfirm = async () => {
    const res = await reservations.confirmRevervation(token, id);
    setPopup(false);
  };
  const handleCancel = async () => {
    const res = await reservations.cancelReservation(id);
    setPopup(false);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Thông tin đặt hàng</h1>
        {reservation && (
          <div className="infoUser">
            <h2>Thông tin khách hàng</h2>
            <p>
              <b>Tên khách hàng:</b> {reservation.name}
            </p>
            <p>
              <b>Số điện thoại:</b> {reservation.phone}
            </p>
            <p>Số người: {reservation.people}</p>
            <p>Thời gian: {reservation.time}</p>
          </div>
        )}
        {menu && (
          <div className="infoMenu">
            <h2>Món ăn đã đặt</h2>
            {menu.map((item) => (
              <div>
                <img src={item.images} alt={item.name} />
                <p> {item.type} </p>
                <p>
                  {item.name} - {item.price} - {item.quantity}
                </p>
              </div>
            ))}
            {tables && (
              <div className="infoTable">
                <h2>Bàn đã đặt</h2>
                {tables.map((table) => (
                  <p>Bàn số: {table.number}</p>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="Buttondetail">
          <button onClick={() => setPopup(false)}>Close</button>
          {type === 1 && <button onClick={handleCheckin}>Check In</button>}
          {type === 2 && <button onClick={handleCheckOut}>Check Out</button>}
          {type === 3 && <button onClick={handleConfirm}>Xác nhận</button>}
          {type === 4 && <button onClick={handleCancel}>Hủy</button>}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
