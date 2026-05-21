// src/pages/user/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/helpers';

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = loadFromLocalStorage('wishlist', []);
    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    saveToLocalStorage('wishlist', updatedWishlist);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart`);
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    alert(`${product.name} moved to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <h2>Your wishlist is empty</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Save your favorite items here
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
          Browse Products
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
      <h1 style={{ marginBottom: '30px', color: '#333' }}>My Wishlist ({wishlistItems.length})</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        <AnimatePresence>
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                ✕
              </button>

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <div style={{ padding: '15px' }}>
                <h3
                  style={{ margin: '0 0 8px 0', fontSize: '18px', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                  {product.description?.substring(0, 60)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#6F4E37' }}>
                    Rs. {product.price}
                  </span>
                  <span style={{ color: '#FF9800', fontSize: '14px' }}>★ {product.rating}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#6F4E37',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => moveToCart(product)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#f0f0f0',
                      color: '#333',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Wishlist;