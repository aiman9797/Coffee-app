// src/pages/user/BaristaDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BaristaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barista, setBarista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBaristaDetail = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        
        const baristaImages = [
          "https://randomuser.me/api/portraits/women/1.jpg",
          "https://randomuser.me/api/portraits/men/2.jpg",
          "https://randomuser.me/api/portraits/women/3.jpg"
        ];
        
        setBarista({
          ...data,
          image: baristaImages[id % baristaImages.length],
          experience: Math.floor(Math.random() * 10) + 1,
          specialty: ['Espresso', 'Latte Art', 'Cold Brew'][id % 3],
          rating: (3 + Math.random() * 2).toFixed(1)
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBaristaDetail();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (!barista) return <div style={{ textAlign: 'center', padding: '50px' }}>Barista not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}
    >
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        ← Back
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: 'white', borderRadius: '20px', padding: '30px' }}>
        <img src={barista.image} alt={barista.name} style={{ width: '100%', borderRadius: '12px' }} />
        
        <div>
          <h1>{barista.name}</h1>
          <p>📧 {barista.email}</p>
          <p>📞 {barista.phone}</p>
          <p>📍 {barista.address?.city}</p>
          <p>🏢 {barista.company?.name}</p>
          <p>⭐ Rating: {barista.rating}</p>
          <p>🎯 Specialty: {barista.specialty}</p>
          <p>📅 Experience: {barista.experience} years</p>
          <button style={{ marginTop: '20px', padding: '12px 24px', background: '#6F4E37', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BaristaDetailPage;