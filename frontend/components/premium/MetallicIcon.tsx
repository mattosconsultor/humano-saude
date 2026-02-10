'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface IconMeshProps {
  type: 'shield' | 'heart' | 'document' | 'checkmark' | 'star' | 'lightning' | 'dollar' | 'users';
}

function IconMesh({ type }: IconMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const goldMaterial = (
    <meshStandardMaterial
      color="#D4AF37"
      metalness={0.95}
      roughness={0.15}
      envMapIntensity={2.5}
    />
  );

  const renderIcon = () => {
    switch (type) {
      case 'shield':
        return (
          <>
            {/* Base do escudo */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1, 0.8, 1.5, 6]} />
              {goldMaterial}
            </mesh>
            {/* Cruz central */}
            <mesh position={[0, 0.2, 0.5]}>
              <boxGeometry args={[0.15, 0.8, 0.1]} />
              <meshStandardMaterial color="#F6E05E" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.2, 0.5]}>
              <boxGeometry args={[0.6, 0.15, 0.1]} />
              <meshStandardMaterial color="#F6E05E" metalness={1} roughness={0.1} />
            </mesh>
          </>
        );
      
      case 'heart':
        return (
          <>
            <mesh position={[-0.3, 0.3, 0]}>
              <sphereGeometry args={[0.4, 32, 32]} />
              {goldMaterial}
            </mesh>
            <mesh position={[0.3, 0.3, 0]}>
              <sphereGeometry args={[0.4, 32, 32]} />
              {goldMaterial}
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.6, 0.6, 0.3]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      case 'document':
        return (
          <>
            <mesh>
              <boxGeometry args={[1, 1.4, 0.1]} />
              {goldMaterial}
            </mesh>
            {/* Linhas do documento */}
            {[0.3, 0.1, -0.1, -0.3, -0.5].map((y, i) => (
              <mesh key={i} position={[0, y, 0.06]}>
                <boxGeometry args={[0.7, 0.08, 0.02]} />
                <meshStandardMaterial color="#F6E05E" metalness={1} roughness={0.1} />
              </mesh>
            ))}
          </>
        );
      
      case 'checkmark':
        return (
          <>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.2, 1, 0.2]} />
              {goldMaterial}
            </mesh>
            <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 3]}>
              <boxGeometry args={[0.2, 0.6, 0.2]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      case 'star':
        return (
          <>
            {[...Array(5)].map((_, i) => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0]}
                  rotation={[0, 0, angle + Math.PI / 2]}
                >
                  <coneGeometry args={[0.15, 0.6, 8]} />
                  {goldMaterial}
                </mesh>
              );
            })}
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      case 'lightning':
        return (
          <>
            <mesh position={[0.1, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.25, 0.8, 0.15]} />
              {goldMaterial}
            </mesh>
            <mesh position={[-0.1, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.25, 0.8, 0.15]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      case 'dollar':
        return (
          <>
            <mesh>
              <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI * 1.5]} />
              {goldMaterial}
            </mesh>
            <mesh rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI * 1.5]} />
              {goldMaterial}
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      case 'users':
        return (
          <>
            {/* Cabeças */}
            <mesh position={[-0.4, 0.3, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              {goldMaterial}
            </mesh>
            <mesh position={[0.4, 0.3, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              {goldMaterial}
            </mesh>
            {/* Corpos */}
            <mesh position={[-0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 0.6, 16]} />
              {goldMaterial}
            </mesh>
            <mesh position={[0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 0.6, 16]} />
              {goldMaterial}
            </mesh>
          </>
        );
      
      default:
        return (
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            {goldMaterial}
          </mesh>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderIcon()}
      
      {/* Luz pontual para brilho */}
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#FFD700" />
    </group>
  );
}

interface MetallicIconProps {
  type: 'shield' | 'heart' | 'document' | 'checkmark' | 'star' | 'lightning' | 'dollar' | 'users';
  className?: string;
  size?: number;
}

export function MetallicIcon({ type, className = '', size = 80 }: MetallicIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" />
        
        <IconMesh type={type} />
      </Canvas>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/30 via-transparent to-transparent blur-xl pointer-events-none" />
    </motion.div>
  );
}
