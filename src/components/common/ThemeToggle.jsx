// src/components/common/ThemeToggle.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../hooks/useDarkMode';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      style={{
        background: darkMode ? '#3d3d3d' : '#f0f0f0',
        border: 'none',
        borderRadius: '30px',
        width: '60px',
        height: '30px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }}
    >
      <motion.div
        animate={{
          x: darkMode ? 30 : 2
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: darkMode ? '#FFD700' : '#6F4E37',
          position: 'absolute',
          top: '2px',
          left: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px'
        }}
      >
        {darkMode ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;