import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createAccountCustomer: async ({ formData }) => {
    return await axiosWrapper.post("/user/register", formData);
  },
};
