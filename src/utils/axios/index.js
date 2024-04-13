import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: "https://localhost:3002",
});

export default axiosWrapper;
