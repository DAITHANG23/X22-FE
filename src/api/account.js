import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAccountCustomer: async () => {
    const res = await axiosWrapper.get("/user/profile");
    return res?.data;
  },
};
