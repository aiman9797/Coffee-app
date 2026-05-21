// src/utils/errorHandler.js

// Handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 400:
        return data.message || 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. This resource already exists.';
      case 422:
        return 'Validation failed. Please check your data.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
      case 502:
      case 503:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred. Please try again.';
    }
  } else if (error.request) {
    return 'Network error. Please check your internet connection.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
};

// Show error notification
export const showError = (message, setError = null) => {
  console.error('Error:', message);
  if (setError) {
    setError(message);
  }
  // You can also integrate a toast notification here
};

// Show success notification
export const showSuccess = (message, setSuccess = null) => {
  console.log('Success:', message);
  if (setSuccess) {
    setSuccess(message);
  }
};

// Handle form validation errors
export const handleValidationErrors = (errors) => {
  const formattedErrors = {};
  
  Object.keys(errors).forEach(key => {
    if (errors[key]?.message) {
      formattedErrors[key] = errors[key].message;
    } else if (typeof errors[key] === 'string') {
      formattedErrors[key] = errors[key];
    }
  });
  
  return formattedErrors;
};

// Create custom error
export const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Check if error is network error
export const isNetworkError = (error) => {
  return !error.response && error.request;
};

// Check if error is authentication error
export const isAuthError = (error) => {
  return error.response && error.response.status === 401;
};

// Get error status code
export const getErrorStatusCode = (error) => {
  return error.response?.status || 500;
};

// Log error to console with details
export const logError = (error, context = '') => {
  console.group(`Error${context ? ` in ${context}` : ''}`);
  console.error('Message:', error.message);
  console.error('Status:', error.response?.status);
  console.error('Data:', error.response?.data);
  console.error('Config:', error.config);
  console.groupEnd();
};

// Retry failed request
export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};