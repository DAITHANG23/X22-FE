import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: "https://x22-be-0ugr.onrender.com",
});

export default axiosWrapper;
