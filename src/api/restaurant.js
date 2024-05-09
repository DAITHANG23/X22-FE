import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getListRestaurantData: ({ page, limit }) => {
    return axiosWrapper.get(`/restaurant?page=${page}&limit=${limit}`);
  },

  queryRestaurant: ({ name, address, type, minPrice, maxPrice }) => {
    const queryParams = new URLSearchParams({
      name,
      address,
      type,
      minPrice,
      maxPrice,
    }).toString();

    return axiosWrapper.get(`/restaurant?${queryParams}`);
  },

  getRestaurantDetail: async ({ restaurantId }) => {
    const res = await axiosWrapper.get(`/restaurant/${restaurantId}`);
    return res.data.data;
  },

  reviewsRestaurant: (formData) => {
    return axiosWrapper.post("/restaurant/reviews", formData);
  },

  getReviewRestaurantDetail: async (restaurantId) => {
    const res = await axiosWrapper.get(`/restaurant/reviews/${restaurantId}`);
    return res?.data?.data;
  },

  getTopRestaurants: async () => {
    const res = await axiosWrapper.get("/restaurant/top");
    return res?.data?.data;
  },

  createRestaurant: (formData) => {
    console.log(formData);
    return axiosWrapper.post("/restaurant/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  editRestaurant: ({ idRestaurant, formData }) => {
    return axiosWrapper.put(`/restaurant/${idRestaurant}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
