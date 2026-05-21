// src/utils/validators.js

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.toString());
};

// Validate password (min 6 chars, at least one letter and one number)
export const isValidPassword = (password) => {
  return password && password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

// Validate name (min 2 chars, max 50 chars, only letters and spaces)
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name);
};

// Validate pincode (Indian - 6 digits)
export const isValidPincode = (pincode) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode.toString());
};

// Validate URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate that field is not empty
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Validate minimum length
export const minLength = (value, length) => {
  if (!value) return false;
  return value.toString().length >= length;
};

// Validate maximum length
export const maxLength = (value, length) => {
  if (!value) return true;
  return value.toString().length <= length;
};

// Validate number range
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

// Validate that value is a number
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Validate positive number
export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

// Validate integer
export const isInteger = (value) => {
  return Number.isInteger(Number(value));
};

// Validate date
export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Validate future date
export const isFutureDate = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d > today;
};

// Validate past date
export const isPastDate = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d < today;
};

// Validate credit card number (Luhn algorithm - basic)
export const isValidCardNumber = (cardNumber) => {
  const cleaned = cardNumber.toString().replace(/\D/g, '');
  return cleaned.length >= 13 && cleaned.length <= 19;
};

// Validate expiry date (MM/YY)
export const isValidExpiryDate = (expiryDate) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  return true;
};

// Validate CVV
export const isValidCVV = (cvv) => {
  const cleaned = cvv.toString().replace(/\D/g, '');
  return cleaned.length >= 3 && cleaned.length <= 4;
};

// Validate coupon code format
export const isValidCouponCode = (code) => {
  const regex = /^[A-Z0-9]{4,20}$/;
  return regex.test(code.toUpperCase());
};

// Validate user ID
export const isValidUserId = (id) => {
  return id && (typeof id === 'number' || /^[a-fA-F0-9]{24}$/.test(id));
};

// Validate product ID
export const isValidProductId = (id) => {
  return id && !isNaN(parseInt(id));
};

// Validate order ID
export const isValidOrderId = (id) => {
  return id && id.startsWith('ORD') && id.length >= 8;
};

// Complete form validation object
export const validateForm = (data, rules) => {
  const errors = {};
  
  for (const field in rules) {
    const value = data[field];
    const fieldRules = rules[field];
    
    for (const rule of fieldRules) {
      let isValid = true;
      let errorMessage = '';
      
      switch (rule.type) {
        case 'required':
          isValid = isRequired(value);
          errorMessage = rule.message || 'This field is required';
          break;
        case 'email':
          isValid = isValidEmail(value);
          errorMessage = rule.message || 'Please enter a valid email address';
          break;
        case 'phone':
          isValid = isValidPhone(value);
          errorMessage = rule.message || 'Please enter a valid 10-digit phone number';
          break;
        case 'password':
          isValid = isValidPassword(value);
          errorMessage = rule.message || 'Password must be at least 6 characters with one letter and one number';
          break;
        case 'minLength':
          isValid = minLength(value, rule.value);
          errorMessage = rule.message || `Minimum ${rule.value} characters required`;
          break;
        case 'maxLength':
          isValid = maxLength(value, rule.value);
          errorMessage = rule.message || `Maximum ${rule.value} characters allowed`;
          break;
        case 'match':
          isValid = value === data[rule.field];
          errorMessage = rule.message || `Field does not match ${rule.field}`;
          break;
        default:
          isValid = true;
      }
      
      if (!isValid) {
        errors[field] = errorMessage;
        break;
      }
    }
  }
  
  return errors;
};

// Common validation rules
export const validationRules = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' }
  ],
  phone: [
    { type: 'required', message: 'Phone number is required' },
    { type: 'phone', message: 'Please enter a valid 10-digit phone number' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'password', message: 'Password must be at least 6 characters with one letter and one number' }
  ],
  confirmPassword: [
    { type: 'required', message: 'Please confirm your password' },
    { type: 'match', field: 'password', message: 'Passwords do not match' }
  ],
  name: [
    { type: 'required', message: 'Name is required' },
    { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
    { type: 'maxLength', value: 50, message: 'Name cannot exceed 50 characters' }
  ],
  address: [
    { type: 'required', message: 'Address is required' },
    { type: 'minLength', value: 5, message: 'Please enter a complete address' }
  ],
  pincode: [
    { type: 'required', message: 'Pincode is required' },
    { type: 'minLength', value: 6, message: 'Please enter a valid 6-digit pincode' },
    { type: 'maxLength', value: 6, message: 'Please enter a valid 6-digit pincode' }
  ]
};