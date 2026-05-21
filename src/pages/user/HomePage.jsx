// src/pages/user/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

const HomePage = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts } = useProducts();
  const [baristas, setBaristas] = useState([]);
  const [loadingBaristas, setLoadingBaristas] = useState(true);
  const [selectedBarista, setSelectedBarista] = useState(null);
  
  const featuredProducts = getFeaturedProducts();

  // High quality barista images
  const baristaImages = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/22.jpg",
    "https://randomuser.me/api/portraits/men/91.jpg"
  ];

  // Barista specialties with details
  const specialties = [
    { name: "Espresso Master", icon: "⚡", description: "Expert in pulling perfect espresso shots", years: 8 },
    { name: "Latte Art Specialist", icon: "🎨", description: "Creates beautiful latte art designs", years: 6 },
    { name: "Cold Brew Expert", icon: "❄️", description: "Specializes in cold brew techniques", years: 5 },
    { name: "Pour Over Professional", icon: "☕", description: "Master of pour over methods", years: 7 },
    { name: "Coffee Roaster", icon: "🔥", description: "Expert in roasting profiles", years: 10 },
    { name: "French Press Master", icon: "🇫🇷", description: "French press specialist", years: 4 }
  ];

  // Certifications
  const certifications = [
    "SCA Certified Barista",
    "Coffee Quality Institute Certified",
    "Latte Art Championship 2023",
    "Brewing Professional Certificate",
    "Coffee Roasting Masterclass"
  ];

  // Languages spoken
  const languages = ["English", "Hindi", "Spanish", "French", "Italian", "Arabic"];

  // Fetch barista data from API
  useEffect(() => {
    const fetchBaristas = async () => {
      setLoadingBaristas(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        const baristasWithDetails = data.slice(0, 6).map((user, index) => {
          const specialty = specialties[index % specialties.length];
          const certCount = (index % 3) + 1;
          
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            company: user.company.name,
            companyCatchPhrase: user.company.catchPhrase,
            city: user.address.city,
            street: user.address.street,
            suite: user.address.suite,
            zipcode: user.address.zipcode,
            experience: specialty.years + Math.floor(Math.random() * 3),
            specialty: specialty.name,
            specialtyIcon: specialty.icon,
            specialtyDesc: specialty.description,
            certifications: certifications.slice(0, certCount),
            languages: languages.slice(0, Math.floor(Math.random() * 3) + 2),
            rating: (4 + Math.random()).toFixed(1),
            totalReviews: Math.floor(Math.random() * 200) + 50,
            completedOrders: Math.floor(Math.random() * 500) + 100,
            availability: ['Monday-Friday', 'Saturday', 'Sunday'][Math.floor(Math.random() * 3)],
            startTime: '9:00 AM',
            endTime: '6:00 PM',
            image: baristaImages[index % baristaImages.length],
            bio: `Expert barista with ${specialty.years + Math.floor(Math.random() * 3)}+ years of experience. ${specialty.description}. Passionate about creating the perfect coffee experience for every customer.`,
            achievements: [
              `${specialty.years + Math.floor(Math.random() * 3)} Years of Excellence`,
              `${Math.floor(Math.random() * 500) + 100}+ Happy Customers`,
              "Certified Coffee Professional"
            ]
          };
        });
        
        setBaristas(baristasWithDetails);
      } catch (error) {
        console.error('Error fetching baristas:', error);
      } finally {
        setLoadingBaristas(false);
      }
    };
    
    fetchBaristas();
  }, []);

  const backgroundImageUrl = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section style={{
        height: '70vh',
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          zIndex: 0
        }} />
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '20px' }}
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              fontFamily: "'Playfair Display', serif",
              marginBottom: '20px',
              color: 'white'
            }}
          >
            Coffee House
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '1.2rem',
              marginBottom: '30px',
              color: 'white'
            }}
          >
            Experience the finest coffee blends crafted with passion and expertise
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            style={{
              padding: '12px 35px',
              fontSize: '1.1rem',
              background: '#6F4E37',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer'
            }}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '35px', fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: '#333' }}>
          Featured Coffees
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '25px'
        }}>
          {featuredProducts.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#333' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '12px' }}>{product.description.substring(0, 60)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#6F4E37' }}>
                    Rs. {product.price}
                  </span>
                  <span style={{ color: '#FF9800', fontSize: '12px' }}>★ {product.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Baristas Section with Detailed Cards */}
      <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ color: 'white', marginBottom: '15px', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif" }}>
              Meet Our Expert Baristas
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              Our skilled baristas bring years of experience and passion to craft the perfect cup just for you
            </p>
          </div>
          
          {loadingBaristas ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div className="spinner" style={{ margin: '0 auto' }} />
              <p style={{ color: 'white', marginTop: '20px' }}>Loading our talented baristas...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {baristas.map((barista, index) => (
                <motion.div
                  key={barista.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedBarista(selectedBarista?.id === barista.id ? null : barista)}
                >
                  {/* Barista Header with Image and Basic Info */}
                  <div style={{
                    background: `linear-gradient(135deg, ${selectedBarista?.id === barista.id ? '#6F4E37' : '#8B6914'}, #6F4E37)`,
                    padding: '25px',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <img
                      src={barista.image}
                      alt={barista.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid white',
                        marginBottom: '15px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                      }}
                    />
                    <h3 style={{ margin: '0', color: 'white', fontSize: '1.5rem' }}>{barista.name}</h3>
                    <div style={{
                      display: 'inline-block',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      marginTop: '8px',
                      fontSize: '12px'
                    }}>
                      {barista.specialtyIcon} {barista.specialty}
                    </div>
                  </div>

                  {/* Barista Details */}
                  <div style={{ padding: '20px' }}>
                    {/* Rating Section */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '15px',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <span style={{ color: '#FF9800', fontSize: '18px', fontWeight: 'bold' }}>★ {barista.rating}</span>
                        <span style={{ color: '#999', fontSize: '12px', marginLeft: '5px' }}>({barista.totalReviews} reviews)</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#6F4E37', fontWeight: 'bold' }}>{barista.completedOrders}</span>
                        <span style={{ color: '#999', fontSize: '12px', display: 'block' }}>Orders Completed</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', marginBottom: '15px' }}>
                      {barista.bio}
                    </p>

                    {/* Experience and Availability */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ background: '#f5f5f5', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '11px', color: '#999' }}>Experience</p>
                        <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#6F4E37' }}>{barista.experience}+ years</p>
                      </div>
                      <div style={{ background: '#f5f5f5', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '11px', color: '#999' }}>Available</p>
                        <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#6F4E37' }}>{barista.availability}</p>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '12px', color: '#333', marginBottom: '8px' }}>Certifications</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {barista.certifications.map((cert, i) => (
                          <span key={i} style={{
                            background: '#e8f5e9',
                            color: '#4CAF50',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '10px'
                          }}>
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '12px', color: '#333', marginBottom: '8px' }}>Languages</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {barista.languages.map((lang, i) => (
                          <span key={i} style={{
                            background: '#e3f2fd',
                            color: '#2196F3',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '10px'
                          }}>
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div style={{
                      background: '#f9f9f9',
                      padding: '12px',
                      borderRadius: '10px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span>📧</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>{barista.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>📞</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>{barista.phone}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div style={{ marginBottom: '15px' }}>
                      {barista.achievements.map((achievement, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ color: '#FFD700' }}>🏆</span>
                          <span style={{ fontSize: '11px', color: '#555' }}>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Book Button */}
                    <button
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#6F4E37',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#5a3d2b'}
                      onMouseLeave={(e) => e.target.style.background = '#6F4E37'}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Booking request sent to ${barista.name}! You will receive a confirmation shortly.`);
                      }}
                    >
                      Book a Session with {barista.name.split(' ')[0]}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;