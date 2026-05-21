// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = getTotalItems();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav style={{
      background: '#6F4E37',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <h2 style={{ margin: 0, color: 'white' }}>Coffee House</h2>
        </motion.div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => navigate('/cart')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                position: 'relative'
              }}
            >
              Cart
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-12px',
                  background: '#f44336',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: 'white',
                  color: '#6F4E37',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {user?.name || 'Account'}
              </button>
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  minWidth: '150px',
                  zIndex: 100
                }}>
                  <Link
                    to="/dashboard"
                    style={{
                      display: 'block',
                      padding: '10px 15px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/orders"
                    style={{
                      display: 'block',
                      padding: '10px 15px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/dashboard/wishlist"
                    style={{
                      display: 'block',
                      padding: '10px 15px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    style={{
                      display: 'block',
                      padding: '10px 15px',
                      color: '#333',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 15px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#f44336'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  background: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '6px 15px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  background: 'white',
                  color: '#6F4E37',
                  border: 'none',
                  padding: '6px 15px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;