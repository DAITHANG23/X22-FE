import axios from "axios";
import env from "../../env";

const axiosWrapper = axios.create({ baseURL: env.REACT_APP_API_URL });

export default axiosWrapper;
