import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAccountCustomer: () => {
    return axiosWrapper.get("/accountCustomer");
  },
};
