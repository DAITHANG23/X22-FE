import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAccountCustomer: async () => {
    const res = await axiosWrapper.get("/user/profile");
    return res?.data;
  },
  getEmployee: async () => {
    const res = await axiosWrapper.get("/user/employee");
    return res?.data;
  },
  deleteEmployee: async (idEmployee) => {
    const res = await axiosWrapper.get("/user/delete/" + idEmployee);
    return res?.data;
  },
};
