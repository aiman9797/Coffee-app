// src/utils/constants.js

// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  GET_CURRENT_USER: '/auth/me',
  UPDATE_PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // Products
  GET_PRODUCTS: '/products',
  GET_PRODUCT: '/products/:id',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: '/products/:id',
  DELETE_PRODUCT: '/products/:id',
  
  // Categories
  GET_CATEGORIES: '/categories',
  
  // Cart
  GET_CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART: '/cart/update',
  REMOVE_FROM_CART: '/cart/remove',
  CLEAR_CART: '/cart/clear',
  
  // Orders
  CREATE_ORDER: '/orders',
  GET_ORDERS: '/orders',
  GET_ORDER: '/orders/:id',
  UPDATE_ORDER_STATUS: '/orders/:id/status',
  
  // Coupons
  VALIDATE_COUPON: '/coupons/validate',
  
  // Admin
  ADMIN_STATS: '/admin/stats',
  ADMIN_USERS: '/admin/users',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_PRODUCTS: '/admin/products'
};

// Route Paths
export const ROUTES = {
  // Public Routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  OFFERS: '/offers',
  
  // Auth Routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User Routes
  DASHBOARD: '/dashboard',
  MY_ORDERS: '/dashboard/orders',
  MY_WISHLIST: '/dashboard/wishlist',
  MY_PROFILE: '/dashboard/profile',
  MY_ADDRESSES: '/dashboard/addresses',
  
  // Cart Routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/:id',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_REPORTS: '/admin/reports'
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  ALL: 'all',
  HOT: 'hot',
  COLD: 'cold',
  ESPRESSO: 'espresso',
  SPECIAL: 'special'
};

export const CATEGORY_LABELS = {
  [PRODUCT_CATEGORIES.ALL]: 'All Coffees',
  [PRODUCT_CATEGORIES.HOT]: 'Hot Coffees',
  [PRODUCT_CATEGORIES.COLD]: 'Cold Coffees',
  [PRODUCT_CATEGORIES.ESPRESSO]: 'Espresso',
  [PRODUCT_CATEGORIES.SPECIAL]: 'Specialty'
};

// Roast Types
export const ROAST_TYPES = {
  LIGHT: 'light',
  MEDIUM: 'medium',
  DARK: 'dark'
};

export const ROAST_LABELS = {
  [ROAST_TYPES.LIGHT]: 'Light Roast',
  [ROAST_TYPES.MEDIUM]: 'Medium Roast',
  [ROAST_TYPES.DARK]: 'Dark Roast'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#FF9800',
  [ORDER_STATUS.CONFIRMED]: '#2196F3',
  [ORDER_STATUS.PROCESSING]: '#9C27B0',
  [ORDER_STATUS.SHIPPED]: '#00BCD4',
  [ORDER_STATUS.DELIVERED]: '#4CAF50',
  [ORDER_STATUS.CANCELLED]: '#f44336'
};

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'cod',
  CARD: 'card',
  EASYPAISA: 'easypaisa',
  JAZZCASH: 'jazzcash',
  BANK_TRANSFER: 'bank_transfer'
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.COD]: 'Cash on Delivery',
  [PAYMENT_METHODS.CARD]: 'Credit / Debit Card',
  [PAYMENT_METHODS.EASYPAISA]: 'EasyPaisa',
  [PAYMENT_METHODS.JAZZCASH]: 'JazzCash',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  CART_ITEMS: 'cartItems',
  DARK_MODE: 'darkMode',
  ADMIN_TOKEN: 'adminToken',
  WISHLIST: 'wishlist',
  RECENTLY_VIEWED: 'recentlyViewed'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  LIMIT_OPTIONS: [12, 24, 48, 96]
};

// Price Range
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 1000,
  STEP: 50
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  INVALID_PINCODE: 'Please enter a valid 6-digit pincode',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_WEAK: 'Password must be at least 6 characters with one number',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNAUTHORIZED: 'Unauthorized. Please login again',
  NOT_FOUND: 'Resource not found'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  ORDER_PLACED: 'Order placed successfully',
  CART_UPDATED: 'Cart updated successfully',
  COUPON_APPLIED: 'Coupon applied successfully'
};

// Image Placeholders
export const PLACEHOLDER_IMAGES = {
  PRODUCT: 'https://via.placeholder.com/300x300?text=No+Image',
  AVATAR: 'https://via.placeholder.com/100x100?text=User',
  BANNER: 'https://via.placeholder.com/1200x400?text=Coffee+House'
};

// Date Format Options
export const DATE_FORMATS = {
  DISPLAY: 'MMMM DD, YYYY',
  DISPLAY_TIME: 'MMMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD',
  SHORT: 'MM/DD/YYYY'
};

// Application Settings
export const APP_SETTINGS = {
  APP_NAME: 'Coffee House',
  COMPANY_NAME: 'Coffee House Pvt Ltd',
  COMPANY_EMAIL: 'support@coffeehouse.com',
  COMPANY_PHONE: '+91 98765 43210',
  COMPANY_ADDRESS: '123 Coffee Street, Brewtown, India - 110001',
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: 'Rs.',
  DELIVERY_CHARGE: 50,
  FREE_DELIVERY_MIN: 500,
  TAX_RATE: 0.05
};