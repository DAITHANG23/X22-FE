import axiosWrapper from "../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  submitOrderRestaurant: (orderRestaurant) => {
    return axiosWrapper.post(`/reservations`, orderRestaurant);
  },
  createMenu: (token, formData) => {
    const formDataObj = new FormData();

    // Thêm các trường dữ liệu vào FormData
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        // Xử lý trường hợp dữ liệu là mảng (ví dụ: images)
        for (let i = 0; i < formData[key].length; i++) {
          formDataObj.append(`${key}[${i}]`, formData[key][i]);
        }
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    console.log("images", formDataObj.getAll("images"));

    return axiosWrapper.post("/tables/menu", formDataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getMenu: () => {
    return axiosWrapper.get("/tables/menu");
  },
  deleteMenu: (token, id) => {
    return axiosWrapper.delete(`/tables/menu/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
