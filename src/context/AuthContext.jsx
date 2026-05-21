// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'user@coffee.com' && password === 'password123') {
          const userData = { id: 1, name: 'John Doe', email: email, role: 'user' };
          localStorage.setItem('authToken', 'demo-token');
          localStorage.setItem('userData', JSON.stringify(userData));
          setUser(userData);
          setLoading(false);
          resolve({ success: true });
        } else {
          setError('Invalid email or password');
          setLoading(false);
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now(), ...userData, role: 'user' };
        localStorage.setItem('authToken', 'demo-token');
        localStorage.setItem('userData', JSON.stringify(newUser));
        setUser(newUser);
        setLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};