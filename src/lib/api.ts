import axios from 'axios';

const API_URL = String(import.meta.env.VITE_API_ROOT_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export default api;
