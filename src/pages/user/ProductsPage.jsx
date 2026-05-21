// src/pages/user/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { products } from '../../data/productsData';

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // State management
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState(null);

  // Categories
  const categories = [
    { id: 'all', name: 'All', icon: '☕', color: '#6F4E37' },
    { id: 'hot', name: 'Hot Coffee', icon: '🔥', color: '#FF6B35' },
    { id: 'cold', name: 'Cold Coffee', icon: '❄️', color: '#4A90E2' },
    { id: 'espresso', name: 'Espresso', icon: '⚡', color: '#8B4513' },
    { id: 'special', name: 'Specialty', icon: '⭐', color: '#FFD700' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'name_asc', label: 'Name: A to Z' }
  ];

  // Load products
  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);
      setTimeout(() => {
        setAllProducts(products);
        setFilteredProducts(products);
        setLoading(false);
      }, 500);
    };
    loadProducts();
  }, []);

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.flavor?.some(f => f.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    result = result.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, selectedCategory, searchQuery, sortBy, priceRange]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
    setPriceRange({ min: 0, max: 1000 });
  };

  const getSmallImage = (imageUrl) => {
    if (imageUrl && imageUrl.includes('unsplash.com')) {
      return `${imageUrl}?w=300&h=200&fit=crop`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        flexDirection: 'column'
      }}>
        <div className="spinner" style={{ width: '50px', height: '50px' }} />
        <p style={{ marginTop: '20px', color: '#666' }}>Loading delicious coffees...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: "'Playfair Display', serif",
          color: '#333',
          marginBottom: '10px'
        }}>
          Our Coffee Collection
        </h1>
        <p style={{ color: '#666' }}>
          Discover our handcrafted coffee blends made with love
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '25px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="🔍 Search coffee by name or flavor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '30px',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#6F4E37'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '12px 15px',
            border: '1px solid #e0e0e0',
            borderRadius: '30px',
            fontSize: '14px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '12px 20px',
            background: showFilters ? '#6F4E37' : '#f5f5f5',
            color: showFilters ? 'white' : '#333',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {showFilters ? '▼ Hide Filters' : '▶ Show Filters'}
        </button>

        {(selectedCategory !== 'all' || searchQuery || sortBy !== 'default') && (
          <button
            onClick={clearFilters}
            style={{
              padding: '12px 20px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              marginBottom: '25px',
              padding: '20px',
              background: '#f9f9f9',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {/* Categories */}
              <div>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>Categories</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: '6px 15px',
                        background: selectedCategory === cat.id ? cat.color : 'white',
                        color: selectedCategory === cat.id ? 'white' : '#666',
                        border: `1px solid ${cat.color}`,
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>Price Range</h4>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>Rs. 0</span>
                    <span style={{ fontSize: '12px', color: '#6F4E37', fontWeight: 'bold' }}>Up to Rs. {priceRange.max}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <p style={{ color: '#666' }}>
          Showing <strong>{filteredProducts.length}</strong> of <strong>{allProducts.length}</strong> products
        </p>
        {searchQuery && (
          <p style={{ color: '#6F4E37' }}>
            Searching for: "{searchQuery}"
          </p>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#f9f9f9',
          borderRadius: '12px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>No products found</h3>
          <p style={{ color: '#666' }}>Try adjusting your search or filter criteria</p>
          <button
            onClick={clearFilters}
            style={{
              marginTop: '20px',
              padding: '10px 25px',
              background: '#6F4E37',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
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
                  fontSize: '11px',
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
                  right: '10px',
                  background: '#4CAF50',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 1
                }}>
                  New
                </div>
              )}

              {/* Product Image */}
              <img
                src={getSmallImage(product.image)}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />

              {/* Product Info */}
              <div style={{ padding: '15px' }}>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {product.name}
                </h3>

                <p style={{
                  color: '#666',
                  fontSize: '12px',
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
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {product.rating} ★
                  </span>
                  <span style={{ color: '#999', fontSize: '11px' }}>
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#6F4E37'
                  }}>
                    Rs. {product.price}
                  </span>
                  {product.oldPrice && (
                    <span style={{
                      fontSize: '12px',
                      textDecoration: 'line-through',
                      color: '#999'
                    }}>
                      Rs. {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleAddToCart(e, product)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: addedToCart === product.id ? '#4CAF50' : '#6F4E37',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'background 0.3s'
                  }}
                >
                  {addedToCart === product.id ? '✓ Added to Cart' : 'Add to Cart'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductsPage;