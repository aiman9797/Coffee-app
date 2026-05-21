// src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { handleAPIError } from '../utils/errorHandler';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = handleAPIError(error);
    error.userMessage = message;
    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async (url, params = {}) => {
  try {
    return await api.get(url, { params });
  } catch (error) {
    throw error;
  }
};

// Generic POST request
export const post = async (url, data = {}) => {
  try {
    return await api.post(url, data);
  } catch (error) {
    throw error;
  }
};

// Generic PUT request
export const put = async (url, data = {}) => {
  try {
    return await api.put(url, data);
  } catch (error) {
    throw error;
  }
};

// Generic DELETE request
export const del = async (url) => {
  try {
    return await api.delete(url);
  } catch (error) {
    throw error;
  }
};

// Generic PATCH request
export const patch = async (url, data = {}) => {
  try {
    return await api.patch(url, data);
  } catch (error) {
    throw error;
  }
};

export default api;