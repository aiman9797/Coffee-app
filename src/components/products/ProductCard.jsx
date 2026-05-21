// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const ProductCard = ({ product, index, showAddToCart = true }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    alert(`${product.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      navigate('/login');
      return;
    }
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: '#f44336',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 1
        }}>
          {product.discount}% OFF
        </div>
      )}

      {/* New Badge */}
      {product.isNew && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: product.discount > 0 ? '70px' : '10px',
          background: '#4CAF50',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 1
        }}>
          New
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />

      {/* Product Info */}
      <div style={{ padding: '15px' }}>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#333'
        }}>
          {product.name}
        </h3>

        <p style={{
          color: '#666',
          fontSize: '13px',
          marginBottom: '10px',
          lineHeight: '1.4'
        }}>
          {product.description.substring(0, 60)}...
        </p>

        {/* Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <span style={{
            background: '#FF9800',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {product.rating} ★
          </span>
          <span style={{ color: '#999', fontSize: '12px' }}>
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#6F4E37'
          }}>
            Rs. {product.price}
          </span>
          {product.oldPrice && (
            <span style={{
              fontSize: '14px',
              textDecoration: 'line-through',
              color: '#999'
            }}>
              Rs. {product.oldPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '10px',
              background: '#6F4E37',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;