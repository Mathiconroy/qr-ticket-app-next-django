const axios = require("axios").default;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Token ${token}` : "";
  return config;
});

export default axiosInstance;
