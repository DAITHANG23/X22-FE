import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListRestaurantData: ({ page, limit }) => {
    return axiosWrapper.get(`/restaurant?page=${page}&limit=${limit}`);
  },

  queryRestaurant: ({ query }) => {
    return axiosWrapper.get(`/restaurant?name=${query}&address=${query}`);
  },

  getRestaurantDetail: ({ restaurantId }) => {
    return axiosWrapper.get(`restaurant/${restaurantId}`);
  },
};
