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

  reviewsRestaurant: (formData) => {
    return axiosWrapper.post("/restaurant/reviews", formData);
  },

  getReviewRestaurantDetail: (restaurantId) => {
    console.log(restaurantId);
    return axiosWrapper.get(`/restaurant/reviews/${restaurantId}`);
  },
};
