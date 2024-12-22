const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

axiosInstance.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
});

export default axiosInstance;
