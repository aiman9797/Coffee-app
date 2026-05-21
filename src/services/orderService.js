// src/services/orderService.js
import { get, post, put } from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await post(API_ENDPOINTS.CREATE_ORDER, orderData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all orders for current user
export const getOrders = async (params = {}) => {
  try {
    return await get(API_ENDPOINTS.GET_ORDERS, params);
  } catch (error) {
    throw error;
  }
};

// Get single order by ID
export const getOrderById = async (id) => {
  try {
    const url = API_ENDPOINTS.GET_ORDER.replace(':id', id);
    return await get(url);
  } catch (error) {
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (id) => {
  try {
    const url = API_ENDPOINTS.UPDATE_ORDER_STATUS.replace(':id', id);
    return await put(url, { status: 'cancelled' });
  } catch (error) {
    throw error;
  }
};

// Get order status
export const getOrderStatus = async (id) => {
  try {
    const order = await getOrderById(id);
    return order.status;
  } catch (error) {
    throw error;
  }
};

// Track order
export const trackOrder = async (id) => {
  try {
    const order = await getOrderById(id);
    return {
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      trackingHistory: order.trackingHistory
    };
  } catch (error) {
    throw error;
  }
};

// Request order return
export const requestReturn = async (id, reason) => {
  try {
    const url = API_ENDPOINTS.GET_ORDER.replace(':id', id);
    return await put(url, { returnRequested: true, returnReason: reason });
  } catch (error) {
    throw error;
  }
};

// Download order invoice
export const downloadInvoice = async (id) => {
  try {
    const order = await getOrderById(id);
    // Generate invoice PDF logic here
    return order;
  } catch (error) {
    throw error;
  }
};

// Get order summary for checkout
export const getOrderSummary = async (items, couponCode = null) => {
  try {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.05;
    
    let discount = 0;
    if (couponCode) {
      const couponResponse = await applyCoupon(couponCode);
      discount = couponResponse.discount;
    }
    
    const total = subtotal + deliveryCharge + tax - discount;
    
    return {
      subtotal,
      deliveryCharge,
      tax,
      discount,
      total
    };
  } catch (error) {
    throw error;
  }
};

// Apply coupon to order
export const applyCoupon = async (couponCode) => {
  try {
    return await post(API_ENDPOINTS.VALIDATE_COUPON, { code: couponCode });
  } catch (error) {
    throw error;
  }
};

// Get order history
export const getOrderHistory = async (limit = 10, offset = 0) => {
  try {
    return await getOrders({ limit, offset });
  } catch (error) {
    throw error;
  }
};

// Reorder previous order
export const reorder = async (orderId) => {
  try {
    const order = await getOrderById(orderId);
    const newOrder = await createOrder({
      items: order.items,
      shippingAddress: order.shippingAddress
    });
    return newOrder;
  } catch (error) {
    throw error;
  }
};