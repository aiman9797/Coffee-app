// src/components/products/ProductFilters.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onClearFilters
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const priceRanges = [
    { min: 0, max: 200, label: 'Under Rs. 200' },
    { min: 200, max: 400, label: 'Rs. 200 - Rs. 400' },
    { min: 400, max: 600, label: 'Rs. 400 - Rs. 600' },
    { min: 600, max: 800, label: 'Rs. 600 - Rs. 800' },
    { min: 800, max: 1000, label: 'Above Rs. 800' }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee',
          marginBottom: isOpen ? '20px' : '0'
        }}
      >
        <h3 style={{ margin: 0, color: '#333' }}>Filters</h3>
        <span style={{ fontSize: '20px' }}>{isOpen ? '−' : '+'}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Categories */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ marginBottom: '12px', color: '#555' }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categories.map(category => (
                  <label
                    key={category.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => onCategoryChange(category.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ color: '#666' }}>
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ marginBottom: '12px', color: '#555' }}>Price Range</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {priceRanges.map(range => (
                  <label
                    key={range.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange.min === range.min && priceRange.max === range.max}
                      onChange={() => onPriceChange(range.min, range.max)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ color: '#666' }}>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={onClearFilters}
              style={{
                width: '100%',
                padding: '10px',
                background: '#f0f0f0',
                color: '#666',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;