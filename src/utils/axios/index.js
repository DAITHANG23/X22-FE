import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: "http://localhost:3002",
});

export default axiosWrapper;
