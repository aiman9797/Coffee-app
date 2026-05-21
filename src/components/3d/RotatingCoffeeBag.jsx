// src/components/3d/RotatingCoffeeBag.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Box, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

// Coffee Bag Component
function CoffeeBag({ color = "#8B6914", label = "COFFEE" }) {
  const bagRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (bagRef.current) {
      bagRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.5;
    }
  });
  
  return (
    <group 
      ref={bagRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Bag Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Bag Top Fold */}
      <mesh position={[0, 1.1, 0]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.2, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      
      {/* Label Area */}
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[1.2, 1.2, 0.05]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.1} />
      </mesh>
      
      {/* Label Text */}
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={0.15}
        height={0.03}
        position={[-0.5, 0, 0.45]}
      >
        {label}
        <meshStandardMaterial color="#4A2C2A" />
      </Text3D>
      
      {/* Decorative elements */}
      {hovered && (
        <mesh position={[0, -0.8, 0.45]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#FF6B35" />
      </mesh>
      )}
    </group>
  );
}

// Main Component
const RotatingCoffeeBag = ({ 
  bagColor = "#8B6914", 
  label = "PREMIUM",
  height = "400px"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring" }}
      style={{ 
        height: height,
        width: "100%",
        perspective: "1000px"
      }}
    >
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "20px" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#FF6B35" />
        <directionalLight position={[0, 5, 0]} intensity={0.8} castShadow />
        
        <CoffeeBag color={bagColor} label={label} />
        
        <OrbitControls 
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={1}
          enablePan={false}
        />
      </Canvas>
    </motion.div>
  );
};

export default RotatingCoffeeBag;