// src/components/common/ErrorMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message, onRetry, fullScreen = false }) => {
  const errorContent = (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: 'center',
        padding: '20px',
        background: '#ffebee',
        borderRadius: '8px',
        color: '#c62828'
      }}
    >
      <h3 style={{ marginBottom: '10px' }}>Error</h3>
      <p style={{ marginBottom: '15px' }}>{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 20px',
            background: '#c62828',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {errorContent}
      </div>
    );
  }

  return errorContent;
};

export default ErrorMessage;