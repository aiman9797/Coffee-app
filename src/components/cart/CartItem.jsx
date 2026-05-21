// src/components/cart/CartItem.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        borderBottom: '1px solid #eee',
        gap: '15px',
        background: 'white'
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
      
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h4>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          {item.category} | {item.roastType} roast
        </p>
        <p style={{ margin: '5px 0 0 0', color: '#6F4E37', fontWeight: 'bold', fontSize: '18px' }}>
          Rs. {item.price}
        </p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            background: 'white',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          -
        </button>
        <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            background: 'white',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          +
        </button>
      </div>
      
      <div style={{ minWidth: '80px', textAlign: 'right' }}>
        <p style={{ margin: '0', fontWeight: 'bold', fontSize: '18px', color: '#6F4E37' }}>
          Rs. {item.price * item.quantity}
        </p>
      </div>
      
      <button
        onClick={() => onRemove(item.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#f44336',
          fontSize: '20px',
          padding: '5px'
        }}
      >
        X
      </button>
    </motion.div>
  );
};

export default CartItem;