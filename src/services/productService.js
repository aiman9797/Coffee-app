// src/services/productService.js
import { get, post, put, del } from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Get all products
export const getProducts = async (params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, params);
  } catch (error) {
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const url = API_ENDPOINTS.GET_PRODUCT.replace(':id', id);
    return await get(url);
  } catch (error) {
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category, params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { ...params, category });
  } catch (error) {
    throw error;
  }
};

// Search products
export const searchProducts = async (query, params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { ...params, search: query });
  } catch (error) {
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { featured: true });
  } catch (error) {
    throw error;
  }
};

// Get new arrivals
export const getNewArrivals = async () => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { isNew: true });
  } catch (error) {
    throw error;
  }
};

// Create product (Admin only)
export const createProduct = async (productData) => {
  try {
    return await post(API_ENDPOINTS.CREATE_PRODUCT, productData);
  } catch (error) {
    throw error;
  }
};

// Update product (Admin only)
export const updateProduct = async (id, productData) => {
  try {
    const url = API_ENDPOINTS.UPDATE_PRODUCT.replace(':id', id);
    return await put(url, productData);
  } catch (error) {
    throw error;
  }
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  try {
    const url = API_ENDPOINTS.DELETE_PRODUCT.replace(':id', id);
    return await del(url);
  } catch (error) {
    throw error;
  }
};

// Get product categories
export const getCategories = async () => {
  try {
    return await get(API_ENDPOINTS.GET_CATEGORIES);
  } catch (error) {
    throw error;
  }
};

// Filter products by price range
export const filterProductsByPrice = async (minPrice, maxPrice, params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { ...params, minPrice, maxPrice });
  } catch (error) {
    throw error;
  }
};

// Sort products
export const sortProducts = async (sortBy, order = 'asc', params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_PRODUCTS, { ...params, sortBy, order });
  } catch (error) {
    throw error;
  }
};