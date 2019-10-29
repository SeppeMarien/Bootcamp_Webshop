/* eslint-disable no-console */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

// Add a request log interceptor
api.interceptors.request.use(config => {
  return config;
});

// Add error log interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.log('Error', error);
    return Promise.reject(error);
  }
);

export default api;
