// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { products, getProductsByCategory, searchProducts, sortProducts } from '../data/productsData';

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, searchQuery, sortBy, priceRange, allProducts]);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setAllProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    }, 500);
  };

  const filterAndSortProducts = () => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
  };

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getProductsByCategoryFilter = (category) => {
    return getProductsByCategory(category);
  };

  const getFeaturedProducts = () => {
    return allProducts.filter(product => product.isFeatured);
  };

  const getNewProducts = () => {
    return allProducts.filter(product => product.isNew);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
    setPriceRange({ min: 0, max: 1000 });
  };

  return {
    products: filteredProducts,
    allProducts,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    getProductById,
    getProductsByCategory: getProductsByCategoryFilter,
    getFeaturedProducts,
    getNewProducts,
    clearFilters
  };
};