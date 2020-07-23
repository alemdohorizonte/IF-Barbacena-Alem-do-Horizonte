import axios from "axios";

const api = axios.create({
  baseURL: window.origin + '/'
});

export default api;