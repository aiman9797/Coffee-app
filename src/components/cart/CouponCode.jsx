// src/components/cart/CouponCode.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CouponCode = ({ onApplyCoupon, appliedCoupon }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const coupons = [
    { code: 'WELCOME20', discount: 20, type: 'percentage', minOrder: 500 },
    { code: 'COFFEE50', discount: 50, type: 'fixed', minOrder: 300 },
    { code: 'FREESHIP', discount: 0, type: 'shipping', minOrder: 400 }
  ];

  const handleApply = () => {
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const foundCoupon = coupons.find(c => c.code === code.toUpperCase());
      
      if (foundCoupon) {
        onApplyCoupon(foundCoupon);
        setCode('');
      } else {
        setError('Invalid coupon code');
      }
      setLoading(false);
    }, 500);
  };

  const handleRemove = () => {
    onApplyCoupon(null);
  };

  if (appliedCoupon) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: '#e8f5e9',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '15px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#4CAF50' }}>
              Coupon Applied: {appliedCoupon.code}
            </p>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
              {appliedCoupon.type === 'percentage' 
                ? `${appliedCoupon.discount}% discount applied` 
                : `Rs. ${appliedCoupon.discount} discount applied`}
            </p>
          </div>
          <button
            onClick={handleRemove}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f44336',
              fontSize: '18px'
            }}
          >
            X
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: '#f5f5f5',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '15px'
      }}
    >
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>
        Apply Coupon Code
      </p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#6F4E37'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApply}
          disabled={loading || !code}
          style={{
            padding: '10px 20px',
            background: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading || !code ? 'not-allowed' : 'pointer',
            opacity: loading || !code ? 0.7 : 1
          }}
        >
          {loading ? 'Applying...' : 'Apply'}
        </motion.button>
      </div>
      
      {error && (
        <p style={{ margin: '10px 0 0 0', color: '#f44336', fontSize: '12px' }}>
          {error}
        </p>
      )}
      
      <div style={{ marginTop: '10px' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          Available coupons: WELCOME20, COFFEE50, FREESHIP
        </p>
      </div>
    </motion.div>
  );
};

export default CouponCode;