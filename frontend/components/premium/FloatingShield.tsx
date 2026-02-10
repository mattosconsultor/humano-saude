'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Shield() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animação de flutuação suave
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Geometria do escudo (forma de brasão)
  const shieldGeometry = new THREE.Shape();
  shieldGeometry.moveTo(0, 2.5);
  shieldGeometry.bezierCurveTo(1.8, 2.5, 2.5, 1.8, 2.5, 0);
  shieldGeometry.lineTo(2.5, -1.5);
  shieldGeometry.bezierCurveTo(2.5, -3, 1.5, -4, 0, -5);
  shieldGeometry.bezierCurveTo(-1.5, -4, -2.5, -3, -2.5, -1.5);
  shieldGeometry.lineTo(-2.5, 0);
  shieldGeometry.bezierCurveTo(-2.5, 1.8, -1.8, 2.5, 0, 2.5);

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 5,
  };

  return (
    <group ref={meshRef}>
      {/* Escudo principal com ouro polido */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shieldGeometry, extrudeSettings]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>

      {/* Cruz/símbolo central em relevo */}
      <mesh position={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.3, 2, 0.2]} />
        <meshStandardMaterial
          color="#F6E05E"
          metalness={1}
          roughness={0.1}
          emissive="#AA8A2E"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0.3, 0.5]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.2]} />
        <meshStandardMaterial
          color="#F6E05E"
          metalness={1}
          roughness={0.1}
          emissive="#AA8A2E"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Borda luminosa */}
      <mesh position={[0, 0, -0.05]}>
        <extrudeGeometry args={[shieldGeometry, { depth: 0.1, bevelEnabled: false }]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Partículas orbitando */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + Date.now() * 0.001) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle + Date.now() * 0.001) * radius,
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}

      {/* Luz pontual para brilho */}
      <pointLight position={[0, 0, 3]} intensity={2} color="#FFD700" />
      <pointLight position={[3, 2, 1]} intensity={1} color="#D4AF37" />
    </group>
  );
}

interface FloatingShieldProps {
  className?: string;
}

export function FloatingShield({ className = '' }: FloatingShieldProps) {
  return (
    <div className={`relative w-full h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Iluminação ambiente premium */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Environment map para reflexões realistas */}
        <Environment preset="sunset" />
        
        <Shield />
        
        {/* Controles suaves (apenas rotação automática) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Glow effect no container */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
