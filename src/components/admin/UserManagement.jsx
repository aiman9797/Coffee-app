// src/components/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaEdit,
  FaTrash,
  FaBan,
  FaCheckCircle,
  FaSearch,
  FaUserPlus
} from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('admin_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Sample users
      const sampleUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', orders: 5, joined: '2024-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', orders: 12, joined: '2024-01-05' },
        { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', orders: 0, joined: '2024-01-01' },
        { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'blocked', orders: 2, joined: '2024-01-10' },
      ];
      setUsers(sampleUsers);
      localStorage.setItem('admin_users', JSON.stringify(sampleUsers));
    }
  }, []);

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'white', borderRadius: '15px', padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👥 User Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <FaUserPlus /> Add User
        </motion.button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 35px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <option value="all">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            style={{
              background: '#f9f9f9',
              borderRadius: '12px',
              padding: '20px',
              border: `1px solid ${user.status === 'active' ? '#4CAF50' : '#f44336'}20`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3 style={{ margin: 0 }}>{user.name}</h3>
                <p style={{ color: '#666', margin: '5px 0' }}>{user.email}</p>
                <div style={{ marginTop: '10px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: user.role === 'admin' ? '#FF980020' : '#2196F320',
                    color: user.role === 'admin' ? '#FF9800' : '#2196F3',
                    fontSize: '12px'
                  }}>
                    {user.role.toUpperCase()}
                  </span>
                  <span style={{
                    marginLeft: '10px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: user.status === 'active' ? '#4CAF5020' : '#f4433620',
                    color: user.status === 'active' ? '#4CAF50' : '#f44336',
                    fontSize: '12px'
                  }}>
                    {user.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleUserStatus(user.id)}
                  style={{
                    background: user.status === 'active' ? '#f44336' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {user.status === 'active' ? <FaBan /> : <FaCheckCircle />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteUser(user.id)}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              color: '#666'
            }}>
              <span>📦 {user.orders} orders</span>
              <span>📅 Joined: {user.joined}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserManagement;