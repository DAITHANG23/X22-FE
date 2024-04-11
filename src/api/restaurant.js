import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListRestaurantData: () => {
    return axiosWrapper.get("/restaurant");
  },

  getRestaurantDetail: async ({ restaurantId }) => {
    const res = await axiosWrapper.get(`/restaurant/${restaurantId}`);
    return res.data.data?.restaurant;
  },
};
