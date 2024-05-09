import { createTable } from "@tanstack/react-table";
import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getReservations: (token) => {
    return axiosWrapper.get("reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getReservationsById: (id) => {
    return axiosWrapper.get(`reservations/${id}`);
  },
  getEmployeeReservations: (token) => {
    return axiosWrapper.get("reservations/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  cancelReservation: (id) => {
    return axiosWrapper.post("reservations/cancel", {
      idReservation: id,
    });
  },
  confirmRevervation: (token, id) => {
    return axiosWrapper.post("reservations/employee/confirm", {
      idReservation: id,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  CheckIn: (token, id) => {
    return axiosWrapper.post("reservations/checkin", {
      idReservation: id,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  CheckOut: (token, id) => {
    return axiosWrapper.post("reservations/checkout", {
      idReservation: id,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getAlltable: (token) => {
    return axiosWrapper.get("tables", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createTable: (token, data) => {
    return axiosWrapper.post("tables/new", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
