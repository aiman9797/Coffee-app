// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#2c1810',
      color: 'white',
      padding: '40px 20px 20px',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px'
      }}>
        {/* About Section */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#6F4E37' }}>Coffee House</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>
            Serving the finest coffee since 2020. We are passionate about bringing you the best coffee experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#6F4E37' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/products" style={{ color: '#ccc', textDecoration: 'none' }}>Products</Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#6F4E37' }}>Contact Us</h3>
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px' }}>
            Email: support@coffeehouse.com
          </p>
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px' }}>
            Phone: +91 98765 43210
          </p>
          <p style={{ color: '#ccc', fontSize: '14px' }}>
            Address: 123 Coffee Street, Brewtown, India
          </p>
        </div>

        {/* Business Hours */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#6F4E37' }}>Business Hours</h3>
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px' }}>
            Monday - Friday: 9:00 AM - 8:00 PM
          </p>
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '8px' }}>
            Saturday: 10:00 AM - 6:00 PM
          </p>
          <p style={{ color: '#ccc', fontSize: '14px' }}>
            Sunday: Closed
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p style={{ color: '#999', fontSize: '12px' }}>
          {currentYear} Coffee House. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;