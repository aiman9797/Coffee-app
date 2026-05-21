// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    const result = await forgotPassword(email);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Failed to send reset link. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ margin: '0', color: '#6F4E37' }}>Forgot Password</h2>
        <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '14px'
          }}
        >
          {error}
        </motion.div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: '500', fontSize: '14px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@coffee.com"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6F4E37'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#6F4E37',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            padding: '20px',
            background: '#e8f5e9',
            borderRadius: '8px'
          }}
        >
          <h3 style={{ color: '#4CAF50', marginBottom: '10px', fontSize: '18px' }}>
            Check Your Email
          </h3>
          <p style={{ color: '#666', fontSize: '14px' }}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>
            (Demo: Check console for simulated email)
          </p>
        </motion.div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/login" style={{ color: '#6F4E37', textDecoration: 'none', fontSize: '13px' }}>
          Back to Login
        </a>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;