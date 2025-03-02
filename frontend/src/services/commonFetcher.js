import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/school/v1/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

const fetcher = {
  get: (url, params = {}) => axiosInstance.get(url, { params }),
  post: (url, data = {}) => axiosInstance.post(url, data),
  put: (url, data = {}) => axiosInstance.put(url, data),
  patch: (url, data = {}) => axiosInstance.patch(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export default fetcher;
