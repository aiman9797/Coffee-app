// src/pages/user/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
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
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryCharge + tax;

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.phone) newErrors.phone = 'Phone required';
    if (formData.phone.length !== 10) newErrors.phone = '10 digit phone required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address required';
    if (!formData.city) newErrors.city = 'City required';
    if (!formData.state) newErrors.state = 'State required';
    if (!formData.pincode) newErrors.pincode = 'Pincode required';
    if (formData.pincode.length !== 6) newErrors.pincode = '6 digit pincode required';
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

  const handlePlaceOrder = () => {
    const orderData = {
      ...formData,
      items: cartItems,
      subtotal,
      deliveryCharge,
      tax,
      total,
      orderDate: new Date().toISOString(),
      orderId: 'ORD' + Date.now()
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    setOrderPlaced(true);
    
    setTimeout(() => {
      navigate('/order-confirmation', { state: { order: orderData } });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}
    >
      <h1 style={{ marginBottom: '30px' }}>Checkout</h1>

      {/* Progress Steps */}
      <div style={{ display: 'flex', marginBottom: '30px', gap: '10px' }}>
        {[1, 2, 3].map(num => (
          <div key={num} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: step >= num ? '#6F4E37' : '#ddd',
              color: step >= num ? 'white' : '#999',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {num}
            </div>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>
              {num === 1 ? 'Info' : num === 2 ? 'Address' : 'Payment'}
            </p>
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h3>Personal Information</h3>
          <div style={{ marginBottom: '15px' }}>
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            {errors.fullName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
          </div>
          <button onClick={handleNext} style={{ padding: '12px 30px', background: '#6F4E37', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Next
          </button>
        </div>
      )}

      {/* Step 2: Address */}
      {step === 2 && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h3>Delivery Address</h3>
          <div style={{ marginBottom: '15px' }}>
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows="3"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            {errors.address && <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
              {errors.city && <p style={{ color: 'red', fontSize: '12px' }}>{errors.city}</p>}
            </div>
            <div>
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
              {errors.state && <p style={{ color: 'red', fontSize: '12px' }}>{errors.state}</p>}
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <input name="pincode" placeholder="Pincode (6 digits)" value={formData.pincode} onChange={handleChange} maxLength="6"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            {errors.pincode && <p style={{ color: 'red', fontSize: '12px' }}>{errors.pincode}</p>}
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button onClick={handleBack} style={{ padding: '12px 30px', background: '#ddd', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Back
            </button>
            <button onClick={handleNext} style={{ padding: '12px 30px', background: '#6F4E37', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h3>Payment Method</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
              <div style={{ marginLeft: '10px' }}>
                <strong>Cash on Delivery</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Pay when you receive your order</p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
              <div style={{ marginLeft: '10px' }}>
                <strong>Credit / Debit Card</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Visa, Mastercard, RuPay</p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="radio" name="paymentMethod" value="easypaisa" checked={formData.paymentMethod === 'easypaisa'} onChange={handleChange} />
              <div style={{ marginLeft: '10px' }}>
                <strong>EasyPaisa / JazzCash</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Mobile wallet payment</p>
              </div>
            </label>
          </div>

          {/* Order Summary */}
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>Order Summary</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Subtotal ({cartItems.length} items)</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Delivery Charge</span>
              <span>{deliveryCharge === 0 ? 'Free' : `Rs. ${deliveryCharge}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Tax (5%)</span>
              <span>Rs. {tax}</span>
            </div>
            <div style={{ borderTop: '1px solid #ddd', marginTop: '10px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total</strong>
                <strong style={{ color: '#6F4E37', fontSize: '20px' }}>Rs. {total}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={handleBack} style={{ padding: '12px 30px', background: '#ddd', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Back
            </button>
            <button onClick={handlePlaceOrder} style={{ padding: '12px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Place Order
            </button>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3 style={{ color: '#4CAF50' }}>Order Placed Successfully!</h3>
          <p>Redirecting to confirmation...</p>
        </div>
      )}
    </motion.div>
  );
};

export default CheckoutPage;