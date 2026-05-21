// src/pages/user/UserDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', name: 'Overview' },
    { id: 'orders', name: 'My Orders' },
    { id: 'profile', name: 'Profile' },
    { id: 'wishlist', name: 'Wishlist' }
  ];

  const stats = {
    totalOrders: 12,
    totalSpent: 4560,
    wishlistItems: 5,
    pendingOrders: 2
  };

  const recentOrders = [
    { id: 'ORD001', date: '2024-01-15', total: 450, status: 'delivered' },
    { id: 'ORD002', date: '2024-01-10', total: 320, status: 'shipped' },
    { id: 'ORD003', date: '2024-01-05', total: 780, status: 'delivered' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#6F4E37',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontSize: '32px',
              color: 'white'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h3 style={{ margin: 0 }}>{user?.name || 'Guest User'}</h3>
            <p style={{ color: '#666', fontSize: '12px' }}>{user?.email || 'user@coffee.com'}</p>
          </div>

          <nav>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'orders') navigate('/dashboard/orders');
                  if (item.id === 'wishlist') navigate('/dashboard/wishlist');
                  if (item.id === 'profile') navigate('/dashboard/profile');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  background: activeTab === item.id ? '#6F4E37' : 'transparent',
                  color: activeTab === item.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '28px', margin: 0, color: '#6F4E37' }}>{stats.totalOrders}</h3>
              <p style={{ color: '#666' }}>Total Orders</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '28px', margin: 0, color: '#6F4E37' }}>Rs. {stats.totalSpent}</h3>
              <p style={{ color: '#666' }}>Total Spent</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '28px', margin: 0, color: '#6F4E37' }}>{stats.wishlistItems}</h3>
              <p style={{ color: '#666' }}>Wishlist Items</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', padding: '20px' }}>
            <h3>Recent Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '10px' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>{order.date}</td>
                    <td style={{ padding: '10px' }}>Rs. {order.total}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: order.status === 'delivered' ? '#4CAF5020' : '#2196F320',
                        color: order.status === 'delivered' ? '#4CAF50' : '#2196F3',
                        fontSize: '12px'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;