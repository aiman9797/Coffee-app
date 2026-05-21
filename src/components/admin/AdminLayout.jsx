// src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', color: '#6F4E37' },
    { path: '/admin/products', icon: <FaBox />, label: 'Products', color: '#4CAF50' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders', color: '#FF9800' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users', color: '#2196F3' },
    { path: '/admin/coupons', icon: <FaTags />, label: 'Coupons', color: '#9C27B0' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports', color: '#F44336' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings', color: '#607D8B' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <motion.aside
        initial={{ width: sidebarOpen ? 260 : 80 }}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #1a0f0a 0%, #2c1810 100%)',
          color: 'white',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          {sidebarOpen ? (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ margin: 0 }}>
              ☕ Admin Panel
            </motion.h2>
          ) : (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ margin: 0 }}>
              ☕
            </motion.h2>
          )}
        </div>

        {/* Menu Items */}
        <nav style={{ padding: '20px 0' }}>
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '12px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  borderLeft: `3px solid transparent`
                }}
                className="admin-nav-link"
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ x: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            padding: '12px',
            background: '#f44336',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontSize: '1rem'
          }}
        >
          <FaSignOutAlt />
          {sidebarOpen && <span>Logout</span>}
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? 260 : 80,
        flex: 1,
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Bar */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          style={{
            background: 'white',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 999
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6F4E37'
            }}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <FaBell style={{ fontSize: '1.3rem', cursor: 'pointer', color: '#666' }} />
            </motion.div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaUserCircle style={{ fontSize: '2rem', color: '#6F4E37' }} />
              <div>
                <div style={{ fontWeight: 'bold' }}>Admin User</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Administrator</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page Content */}
        <div style={{ padding: '30px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;