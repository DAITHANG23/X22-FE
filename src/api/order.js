import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  submitOrderRestaurant: ({ orderRestaurant }) => {
    return axiosWrapper.post(`/orderrestaurant`, orderRestaurant);
  },
};
