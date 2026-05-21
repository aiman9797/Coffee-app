// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '../../components/admin/DashboardStats';
import {
  FaChartLine,
  FaCoffee,
  FaShoppingBag,
  FaUsers
} from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: '₹45,230',
    totalOrders: 156,
    totalUsers: 1243,
    totalProducts: 48,
    salesTrend: 'up',
    salesPercentage: 12.5
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD001', customer: 'John Doe', amount: 450, status: 'delivered', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Jane Smith', amount: 320, status: 'shipped', date: '2024-01-14' },
    { id: '#ORD003', customer: 'Mike Johnson', amount: 780, status: 'pending', date: '2024-01-13' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { name: 'Cappuccino', sales: 245, revenue: 61250 },
    { name: 'Latte', sales: 198, revenue: 53460 },
    { name: 'Cold Brew', sales: 167, revenue: 50100 },
    { name: 'Mocha', sales: 145, revenue: 46400 },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 style={{ marginBottom: '20px' }}>📊 Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* Recent Orders */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px' }}>
          <h3>🕒 Recent Orders</h3>
          <table style={{ width: '100%', marginTop: '15px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
               </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{order.id}</td>
                  <td style={{ padding: '10px' }}>{order.customer}</td>
                  <td style={{ padding: '10px' }}>₹{order.amount}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: order.status === 'delivered' ? '#4CAF5020' : 
                                 order.status === 'shipped' ? '#2196F320' : '#FF980020',
                      color: order.status === 'delivered' ? '#4CAF50' : 
                             order.status === 'shipped' ? '#2196F3' : '#FF9800'
                    }}>
                      {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px' }}>
          <h3>🏆 Top Selling Products</h3>
          {topProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: index * 0.1 }}
              style={{ marginTop: '15px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>{product.name}</span>
                <span>{product.sales} sales</span>
              </div>
              <div style={{
                background: '#f0f0f0',
                height: '30px',
                borderRadius: '15px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: '#6F4E37',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  ₹{product.revenue}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;