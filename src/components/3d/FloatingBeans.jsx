// src/components/3d/FloatingBeans.jsx
import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

// Single Coffee Bean
function CoffeeBean({ position, delay }) {
  const beanRef = React.useRef();
  
  useFrame((state) => {
    if (beanRef.current) {
      beanRef.current.rotation.y += 0.01;
      beanRef.current.rotation.x += 0.005;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={beanRef} position={position}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#4A2C2A" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 16, 32]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
      </group>
    </Float>
  );
}

// Multiple Beans
function BeansGroup({ count = 20 }) {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 + 1,
        (Math.random() - 0.5) * 6 - 2
      ]);
    }
    return pos;
  }, [count]);

  return (
    <>
      {positions.map((pos, i) => (
        <CoffeeBean key={i} position={pos} delay={i * 0.1} />
      ))}
    </>
  );
}

const FloatingBeans = ({ beanCount = 30, height = "300px" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ 
        height: height,
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 3, 5]} intensity={0.5} color="#FF6B35" />
        
        <BeansGroup count={beanCount} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
      
      <div style={{
        position: "absolute",
        bottom: "10px",
        left: 0,
        right: 0,
        textAlign: "center",
        color: "white",
        fontSize: "12px",
        background: "rgba(0,0,0,0.5)",
        padding: "5px"
      }}>
        Floating Coffee Beans Animation
      </div>
    </motion.div>
  );
};

export default FloatingBeans;