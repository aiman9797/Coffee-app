// src/components/3d/SteamEffect.jsx
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';

function SteamParticles() {
  const particlesRef = React.useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      <Sparkles 
        count={100}
        scale={[2, 3, 2]}
        size={0.1}
        color="#ffffff"
        opacity={0.4}
        position={[0, 1, 0]}
      />
    </group>
  );
}

const SteamEffect = ({ height = "200px" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        height: height,
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
        background: "linear-gradient(to top, #6F4E37, #2c1810)",
        position: 'relative'
      }}
    >
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 2, 0]} intensity={0.5} color="#FF6B35" />
        <SteamParticles />
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
        Steam Effect Animation
      </div>
    </motion.div>
  );
};

export default SteamEffect;