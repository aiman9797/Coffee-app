// src/pages/user/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>About Coffee House</h1>
        <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          We are passionate coffee lovers dedicated to bringing you the finest coffee experience
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '60px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Our Story</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Founded in 2020, Coffee House started with a simple mission: to serve the highest quality coffee 
            while creating a warm and welcoming space for coffee lovers. We source our beans directly from 
            sustainable farms around the world, ensuring every cup tells a story of craftsmanship and care.
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Our Mission</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            To inspire and nurture the human spirit one cup at a time. We believe that coffee is more than 
            just a beverage - it's a connection, a moment of pause, and a daily ritual that brings people together.
          </p>
        </div>
      </div>

      <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '30px', color: '#333' }}>Why Choose Us</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>Premium Quality</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Carefully selected beans from best farms</p>
          </div>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>Expert Roasting</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Master roasters with years of experience</p>
          </div>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>Fresh Delivery</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Roasted and shipped within 48 hours</p>
          </div>
          <div>
            <h4 style={{ fontSize: '24px', marginBottom: '10px' }}>Sustainable</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Eco-friendly packaging and practices</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;