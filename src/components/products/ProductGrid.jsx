// src/components/products/ProductGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, columns = 3, showAddToCart = true }) => {
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '25px'
      }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            style={{
              background: '#f0f0f0',
              borderRadius: '12px',
              height: '350px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        background: '#f9f9f9',
        borderRadius: '12px'
      }}>
        <h3>No products found</h3>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '25px'
      }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          showAddToCart={showAddToCart}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;