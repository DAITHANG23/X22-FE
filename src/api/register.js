import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createAccountCustomer: ({ formData }) => {
    return axiosWrapper.post("/register", formData);
  },
};
