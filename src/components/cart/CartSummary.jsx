// src/components/cart/CartSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ items, totalPrice, onClearCart }) => {
  const navigate = useNavigate();
  
  const subtotal = totalPrice;
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryCharge + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', color: '#333', borderBottom: '2px solid #6F4E37', paddingBottom: '10px' }}>
        Order Summary
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#666' }}>Subtotal</span>
          <span style={{ fontWeight: 'bold' }}>Rs. {subtotal}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#666' }}>Delivery Charge</span>
          <span style={{ fontWeight: 'bold' }}>{deliveryCharge === 0 ? 'Free' : `Rs. ${deliveryCharge}`}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#666' }}>Tax (5%)</span>
          <span style={{ fontWeight: 'bold' }}>Rs. {tax.toFixed(0)}</span>
        </div>
        <div style={{ borderTop: '1px solid #ddd', marginTop: '10px', paddingTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Total</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#6F4E37' }}>Rs. {grandTotal.toFixed(0)}</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
            You saved Rs. {items.reduce((sum, item) => sum + ((item.oldPrice - item.price) * item.quantity), 0)} on this order
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/checkout')}
          style={{
            width: '100%',
            padding: '14px',
            background: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Proceed to Checkout
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearCart}
          style={{
            width: '100%',
            padding: '12px',
            background: 'white',
            color: '#f44336',
            border: '1px solid #f44336',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartSummary;