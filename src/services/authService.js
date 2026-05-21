// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Login user
  login: async (email, password) => {
    // For demo purposes - simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials check
        if (email === 'user@coffee.com' && password === 'password123') {
          resolve({
            user: {
              id: 1,
              name: 'John Doe',
              email: 'user@coffee.com',
              role: 'user',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            token: 'demo-token-12345'
          });
        } else {
          reject({ response: { data: { message: 'Invalid email or password' } } });
        }
      }, 1000);
    });

    // Real API call (uncomment when backend is ready)
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
  },

  // Register user
  signup: async (userData) => {
    // For demo purposes - simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
          },
          token: 'demo-token-' + Date.now()
        });
      }, 1000);
    });

    // Real API call
    // const response = await api.post('/auth/signup', userData);
    // return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    // For demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: 'John Doe',
          email: 'user@coffee.com',
          role: 'user',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        });
      }, 500);
    });

    // Real API call
    // const response = await api.get('/auth/me');
    // return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    // For demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Reset link sent' });
      }, 1000);
    });

    // Real API call
    // const response = await api.post('/auth/forgot-password', { email });
    // return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    // For demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset successful' });
      }, 1000);
    });

    // Real API call
    // const response = await api.post('/auth/reset-password', { token, newPassword });
    // return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    // For demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...profileData,
          id: 1
        });
      }, 1000);
    });

    // Real API call
    // const response = await api.put('/auth/profile', profileData);
    // return response.data;
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    // For demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password changed' });
      }, 1000);
    });

    // Real API call
    // const response = await api.post('/auth/change-password', { oldPassword, newPassword });
    // return response.data;
  }
};