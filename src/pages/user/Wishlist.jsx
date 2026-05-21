// src/pages/user/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/helpers';

const Wishlist = () => {
  const navigate = useNavigate();
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

  if (wishlistItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Your wishlist is empty</h2>
        <button
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
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <h1>My Wishlist ({wishlistItems.length})</h1>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginBottom: '30px',
          padding: '8px 16px',
          background: '#6F4E37',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Back to Dashboard
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {wishlistItems.map(product => (
          <div key={product.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <button
              onClick={() => removeFromWishlist(product.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer'
              }}
            >
              X
            </button>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.id}`)} />
            <div style={{ padding: '15px' }}>
              <h3>{product.name}</h3>
              <p>Rs. {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Wishlist;