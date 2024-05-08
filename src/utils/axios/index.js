import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axiosWrapper;
