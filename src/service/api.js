import axios from "axios";

axios.defaults.baseURL = "https://autoapi.dezinfeksiyatashkent.uz/api/";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization

  return config;
});

export default axios;
