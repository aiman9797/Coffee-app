// src/pages/user/OrderHistory.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: 'ORD001', date: '2024-01-15', total: 450, status: 'delivered', items: 3, payment: 'COD' },
    { id: 'ORD002', date: '2024-01-10', total: 320, status: 'shipped', items: 2, payment: 'Card' },
    { id: 'ORD003', date: '2024-01-05', total: 780, status: 'delivered', items: 4, payment: 'EasyPaisa' }
  ];

  const statusColors = {
    pending: '#FF9800',
    shipped: '#2196F3',
    delivered: '#4CAF50',
    cancelled: '#f44336'
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Order History</h1>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
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
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {['all', 'pending', 'shipped', 'delivered'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 20px',
              background: filter === status ? '#6F4E37' : '#f0f0f0',
              color: filter === status ? 'white' : '#333',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '12px' }}>
          <h3>No orders found</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredOrders.map(order => (
            <div key={order.id} style={{ background: 'white', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{order.id}</h3>
                  <p style={{ color: '#666', fontSize: '12px' }}>Placed on {order.date}</p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: `${statusColors[order.status]}20`,
                  color: statusColors[order.status],
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}>
                  {order.status}
                </span>
              </div>
              <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <p>Total Amount: <strong>Rs. {order.total}</strong></p>
                <p>Items: {order.items} products</p>
                <p>Payment: {order.payment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderHistory;