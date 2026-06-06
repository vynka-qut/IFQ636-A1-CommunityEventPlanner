import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.206.45.11',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;