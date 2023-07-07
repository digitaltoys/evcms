import axios from "axios";

const API_SERVER = "/api/";

const axiosInstance = axios.create({
  baseURL: API_SERVER,
});

export default axiosInstance;
