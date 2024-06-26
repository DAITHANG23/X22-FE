import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: async ({ formData }) => {
    return await axiosWrapper.post("/user/login", formData);
  },
};
