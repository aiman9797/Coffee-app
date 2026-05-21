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
    { id: 'ORD003', date: '2024-01-05', total: 780, status: 'delivered', items: 4, payment: 'EasyPaisa' },
    { id: 'ORD004', date: '2024-01-01', total: 250, status: 'cancelled', items: 1, payment: 'COD' },
    { id: 'ORD005', date: '2023-12-28', total: 560, status: 'delivered', items: 3, payment: 'Card' }
  ];

  const statusColors = {
    pending: '#FF9800',
    confirmed: '#2196F3',
    shipped: '#9C27B0',
    delivered: '#4CAF50',
    cancelled: '#f44336'
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>Order History</h1>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '8px 16px',
            background: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '12px' }}>
          <h3>No orders found</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{order.id}</h3>
                  <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Placed on {order.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: `${statusColors[order.status]}20`,
                    color: statusColors[order.status],
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <div>
                    <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Total Amount</p>
                    <p style={{ fontWeight: 'bold', margin: '5px 0 0 0' }}>Rs. {order.total}</p>
                  </div>
                  <div>
                    <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Items</p>
                    <p style={{ margin: '5px 0 0 0' }}>{order.items} products</p>
                  </div>
                  <div>
                    <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Payment Method</p>
                    <p style={{ margin: '5px 0 0 0' }}>{order.payment}</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate(`/order/${order.id}`)}
                  style={{
                    padding: '8px 16px',
                    background: '#6F4E37',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button
                    style={{
                      padding: '8px 16px',
                      background: 'white',
                      color: '#6F4E37',
                      border: '1px solid #6F4E37',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Buy Again
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderHistory;