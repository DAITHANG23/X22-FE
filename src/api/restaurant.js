import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListRestaurantData: () => {
    return axiosWrapper.get("/restaurantList");
  },
};
