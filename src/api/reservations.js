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
  cancelReservation: (id) => {
    return axiosWrapper.post("reservations/cancel", {
      idReservation: id,
    });
  },
};
