// src/pages/user/CartPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { CartItem, CartSummary, CouponCode } from '../../components/cart';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '80px 20px' }}
      >
        <h2>Your cart is empty</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Looks like you haven't added any items yet
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
          style={{
            marginTop: '30px',
            padding: '12px 30px',
            background: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
        {/* Cart Items */}
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '15px', background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 0.5fr', gap: '15px' }}>
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span>
            </div>
          </div>
          
          <AnimatePresence>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary
            items={cartItems}
            totalPrice={getTotalPrice()}
            onClearCart={clearCart}
          />
          <CouponCode
            onApplyCoupon={handleApplyCoupon}
            appliedCoupon={appliedCoupon}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;