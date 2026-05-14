import axios from 'axios';
import { logOperation, logError } from '../utils/logger';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logOperation('API Request', { url: config.url, method: config.method });
    return config;
  },
  (error) => {
    logError('API Request Error', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    logOperation('API Response Success', { url: response.config.url, status: response.status });
    return response;
  },
  (error) => {
    logError('API Response Error', error);
    return Promise.reject(error);
  }
);

export default apiClient;