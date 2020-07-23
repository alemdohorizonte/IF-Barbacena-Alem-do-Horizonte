import axios from "axios";

const api = axios.create({
  baseURL: window.location.protocol + '//' + window.location.hostname + ':3333',
  timeout: 30000,
});

export default api;