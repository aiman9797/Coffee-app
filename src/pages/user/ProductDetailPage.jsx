// src/pages/user/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    setProduct(fetchedProduct);
    setLoading(false);
  }, [id, getProductById]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize }, quantity);
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <button
        onClick={() => navigate('/products')}
        style={{
          marginBottom: '30px',
          padding: '8px 16px',
          background: '#ddd',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Product Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 style={{ marginBottom: '10px', color: '#333' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ color: '#FF9800', fontSize: '18px' }}>★ {product.rating}</span>
            <span style={{ color: '#666' }}>({product.reviewCount} reviews)</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {product.oldPrice ? (
              <>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#6F4E37' }}>
                  Rs. {product.price}
                </span>
                <span style={{ marginLeft: '10px', textDecoration: 'line-through', color: '#999' }}>
                  Rs. {product.oldPrice}
                </span>
                <span style={{ marginLeft: '10px', color: '#4CAF50' }}>
                  Save Rs. {product.oldPrice - product.price}
                </span>
              </>
            ) : (
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#6F4E37' }}>
                Rs. {product.price}
              </span>
            )}
          </div>

          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            {product.longDescription || product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Select Size</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 16px',
                      background: selectedSize === size ? '#6F4E37' : '#f0f0f0',
                      color: selectedSize === size ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ marginBottom: '10px' }}>Quantity</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '18px', minWidth: '40px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '15px',
              background: '#6F4E37',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add to Cart - Rs. {product.price * quantity}
          </motion.button>

          {/* Product Details */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <h4>Product Details</h4>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#666' }}>
              <li>Category: {product.category}</li>
              <li>Roast Type: {product.roastType}</li>
              <li>Flavor: {product.flavor?.join(', ')}</li>
              <li>Ingredients: {product.ingredients?.join(', ')}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;