// src/components/cart/CheckoutForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalPrice, items, onPlaceOrder }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (formData.pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3) {
      const orderData = {
        ...formData,
        items: items,
        totalPrice: totalPrice,
        orderDate: new Date().toISOString(),
        orderId: 'ORD' + Date.now()
      };
      onPlaceOrder(orderData);
      navigate('/order-confirmation', { state: { order: orderData } });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: step >= 1 ? '#6F4E37' : '#ddd',
              color: step >= 1 ? 'white' : '#999',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <p style={{ fontSize: '12px', marginTop: '5px', color: step >= 1 ? '#6F4E37' : '#999' }}>
              Personal Info
            </p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: step >= 2 ? '#6F4E37' : '#ddd',
              color: step >= 2 ? 'white' : '#999',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              2
            </div>
            <p style={{ fontSize: '12px', marginTop: '5px', color: step >= 2 ? '#6F4E37' : '#999' }}>
              Address
            </p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: step >= 3 ? '#6F4E37' : '#ddd',
              color: step >= 3 ? 'white' : '#999',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              3
            </div>
            <p style={{ fontSize: '12px', marginTop: '5px', color: step >= 3 ? '#6F4E37' : '#999' }}>
              Payment
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Personal Information</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.fullName ? '#f44336' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              {errors.fullName && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.fullName}</p>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.email ? '#f44336' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              {errors.email && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.phone ? '#f44336' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              {errors.phone && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.phone}</p>}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Delivery Address</h3>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.address ? '#f44336' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              {errors.address && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.address}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${errors.city ? '#f44336' : '#ddd'}`,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                {errors.city && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.city}</p>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${errors.state ? '#f44336' : '#ddd'}`,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                {errors.state && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.state}</p>}
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontSize: '14px' }}>
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.pincode ? '#f44336' : '#ddd'}`,
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              {errors.pincode && <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>{errors.pincode}</p>}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Payment Method</h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  style={{ marginRight: '10px' }}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Pay when you receive your order</p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  style={{ marginRight: '10px' }}
                />
                <div>
                  <strong>Credit / Debit Card</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Visa, Mastercard, RuPay</p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="easypaisa"
                  checked={formData.paymentMethod === 'easypaisa'}
                  onChange={handleChange}
                  style={{ marginRight: '10px' }}
                />
                <div>
                  <strong>EasyPaisa / JazzCash</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Mobile wallet payment</p>
                </div>
              </label>
            </div>

            <div style={{
              background: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Order Summary</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Items ({items.length})</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Delivery</span>
                <span>{totalPrice > 500 ? 'Free' : 'Rs. 50'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
                <strong>Total to Pay</strong>
                <strong>Rs. {totalPrice + (totalPrice > 500 ? 0 : 50)}</strong>
              </div>
            </div>
          </motion.div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleBack}
              style={{
                padding: '12px 30px',
                background: '#ddd',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Back
            </motion.button>
          )}
          
          {step < 3 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleNext}
              style={{
                padding: '12px 30px',
                background: '#6F4E37',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                padding: '12px 30px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Place Order
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;