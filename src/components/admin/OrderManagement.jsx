// src/components/admin/OrderManagement.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaEye,
  FaPrint,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch
} from 'react-icons/fa';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('admin_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Sample orders
      const sampleOrders = [
        { id: '#ORD001', customer: 'John Doe', date: '2024-01-15', total: 450, status: 'delivered', items: 3 },
        { id: '#ORD002', customer: 'Jane Smith', date: '2024-01-14', total: 320, status: 'shipped', items: 2 },
        { id: '#ORD003', customer: 'Mike Johnson', date: '2024-01-13', total: 780, status: 'pending', items: 4 },
        { id: '#ORD004', customer: 'Sarah Williams', date: '2024-01-12', total: 250, status: 'cancelled', items: 1 },
        { id: '#ORD005', customer: 'David Brown', date: '2024-01-11', total: 560, status: 'confirmed', items: 3 },
      ];
      setOrders(sampleOrders);
      localStorage.setItem('admin_orders', JSON.stringify(sampleOrders));
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FF9800',
      confirmed: '#2196F3',
      shipped: '#9C27B0',
      delivered: '#4CAF50',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      case 'shipped': return <FaTruck />;
      default: return <FaEye />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'white', borderRadius: '15px', padding: '20px' }}
    >
      <h2 style={{ marginBottom: '20px' }}>🛒 Order Management</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 35px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px' }}>Order ID</th>
              <th style={{ padding: '12px' }}>Customer</th>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Items</th>
              <th style={{ padding: '12px' }}>Total</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ borderBottom: '1px solid #eee' }}
              >
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px' }}>{order.date}</td>
                <td style={{ padding: '12px' }}>{order.items} items</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>₹{order.total}</td>
                <td style={{ padding: '12px' }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      border: `1px solid ${getStatusColor(order.status)}`,
                      color: getStatusColor(order.status),
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <motion.button whileHover={{ scale: 1.1 }} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                      <FaEye />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} style={{ background: '#607D8B', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                      <FaPrint />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>Total Orders: <strong>{orders.length}</strong></div>
        <div>Pending: <strong>{orders.filter(o => o.status === 'pending').length}</strong></div>
        <div>Shipped: <strong>{orders.filter(o => o.status === 'shipped').length}</strong></div>
        <div>Delivered: <strong>{orders.filter(o => o.status === 'delivered').length}</strong></div>
        <div>Revenue: <strong>₹{orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0)}</strong></div>
      </div>
    </motion.div>
  );
};

export default OrderManagement;