// src/components/3d/Simple3DCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Coffee3DModel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, type: 'spring' }}
      whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
      style={{
        perspective: '1000px',
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        cursor: 'pointer'
      }}
    >
      <motion.div
        style={{
          width: '200px',
          height: '200px',
          background: '#6F4E37',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '80px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
        animate={{ 
          boxShadow: ['0 20px 40px rgba(0,0,0,0.2)', '0 30px 50px rgba(0,0,0,0.3)', '0 20px 40px rgba(0,0,0,0.2)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ☕
      </motion.div>
    </motion.div>
  );
};


export default Coffee3DModel;