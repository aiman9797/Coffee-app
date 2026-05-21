// src/services/cartService.js
import { get, post, put, del } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/helpers';

// Get cart items
export const getCart = async () => {
  try {
    const response = await get(API_ENDPOINTS.GET_CART);
    saveToLocalStorage('cartItems', response.items);
    return response;
  } catch (error) {
    const localCart = loadFromLocalStorage('cartItems');
    return { items: localCart || [], total: 0 };
  }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1, size = null) => {
  try {
    const response = await post(API_ENDPOINTS.ADD_TO_CART, { productId, quantity, size });
    saveToLocalStorage('cartItems', response.items);
    return response;
  } catch (error) {
    // Handle offline mode with localStorage
    const localCart = loadFromLocalStorage('cartItems', []);
    const existingItem = localCart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      localCart.push({ productId, quantity, size });
    }
    
    saveToLocalStorage('cartItems', localCart);
    return { items: localCart, total: 0 };
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await put(API_ENDPOINTS.UPDATE_CART, { productId, quantity });
    saveToLocalStorage('cartItems', response.items);
    return response;
  } catch (error) {
    const localCart = loadFromLocalStorage('cartItems', []);
    const itemIndex = localCart.findIndex(item => item.productId === productId);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        localCart.splice(itemIndex, 1);
      } else {
        localCart[itemIndex].quantity = quantity;
      }
    }
    
    saveToLocalStorage('cartItems', localCart);
    return { items: localCart, total: 0 };
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await del(`${API_ENDPOINTS.REMOVE_FROM_CART}/${productId}`);
    saveToLocalStorage('cartItems', response.items);
    return response;
  } catch (error) {
    const localCart = loadFromLocalStorage('cartItems', []);
    const updatedCart = localCart.filter(item => item.productId !== productId);
    saveToLocalStorage('cartItems', updatedCart);
    return { items: updatedCart, total: 0 };
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const response = await post(API_ENDPOINTS.CLEAR_CART);
    saveToLocalStorage('cartItems', []);
    return response;
  } catch (error) {
    saveToLocalStorage('cartItems', []);
    return { items: [], total: 0 };
  }
};

// Get cart total
export const getCartTotal = async () => {
  try {
    const response = await get(API_ENDPOINTS.GET_CART);
    return response.total;
  } catch (error) {
    const localCart = loadFromLocalStorage('cartItems', []);
    const total = localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total;
  }
};

// Get cart item count
export const getCartItemCount = async () => {
  try {
    const response = await get(API_ENDPOINTS.GET_CART);
    return response.items.length;
  } catch (error) {
    const localCart = loadFromLocalStorage('cartItems', []);
    return localCart.length;
  }
};

// Apply coupon to cart
export const applyCoupon = async (couponCode) => {
  try {
    return await post(API_ENDPOINTS.VALIDATE_COUPON, { code: couponCode });
  } catch (error) {
    throw error;
  }
};