import axios from 'axios';

const API_URL = `http://localhost:8080/api-v1`;

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);

export default api;
