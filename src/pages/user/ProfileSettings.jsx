// src/pages/user/ProfileSettings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}
    >
      <h1>Profile Settings</h1>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginBottom: '30px',
          padding: '8px 16px',
          background: '#6F4E37',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Back to Dashboard
      </button>

      {message && (
        <div style={{ padding: '10px', background: '#4CAF5020', color: '#4CAF50', borderRadius: '8px', marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>Full Name</label>
          <input type="text" name="name" value={profileData.name} onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Email Address</label>
          <input type="email" name="email" value={profileData.email} onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} placeholder="9876543210"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginTop: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '12px 24px', background: '#6F4E37', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Save Changes
        </button>
      </form>
    </motion.div>
  );
};

export default ProfileSettings;