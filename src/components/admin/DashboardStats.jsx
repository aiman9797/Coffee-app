// src/components/admin/DashboardStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShoppingBag,
  FaUsers,
  FaDollarSign,
  FaBoxOpen,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, trend, percentage }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      style={{
        background: 'white',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${color}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#666', margin: 0 }}>{title}</p>
          <h2 style={{ margin: '10px 0', fontSize: '2rem' }}>{value}</h2>
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
              {trend === 'up' ? (
                <FaArrowUp color="#4CAF50" />
              ) : (
                <FaArrowDown color="#f44336" />
              )}
              <span style={{ color: trend === 'up' ? '#4CAF50' : '#f44336' }}>
                {percentage}% from last month
              </span>
            </div>
          )}
        </div>
        <div style={{
          background: `${color}20`,
          padding: '15px',
          borderRadius: '50%',
          color: color
        }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const DashboardStats = ({ stats }) => {
  const defaultStats = stats || {
    totalSales: '₹45,230',
    totalOrders: 156,
    totalUsers: 1243,
    totalProducts: 48,
    salesTrend: 'up',
    salesPercentage: 12.5
  };

  const statItems = [
    { title: 'Total Revenue', value: defaultStats.totalSales, icon: <FaDollarSign size={24} />, color: '#4CAF50', trend: defaultStats.salesTrend, percentage: defaultStats.salesPercentage },
    { title: 'Total Orders', value: defaultStats.totalOrders, icon: <FaShoppingBag size={24} />, color: '#FF9800', trend: 'up', percentage: 8.3 },
    { title: 'Total Users', value: defaultStats.totalUsers, icon: <FaUsers size={24} />, color: '#2196F3', trend: 'up', percentage: 15.2 },
    { title: 'Products', value: defaultStats.totalProducts, icon: <FaBoxOpen size={24} />, color: '#9C27B0', trend: 'up', percentage: 5.1 }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    }}>
      {statItems.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;