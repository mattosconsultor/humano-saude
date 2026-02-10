'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);

  // Gerar posições aleatórias para as estrelas
  const [positions, colors, sizes] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const goldColors = [
      new THREE.Color('#D4AF37'), // Gold
      new THREE.Color('#FFD700'), // Pure Gold
      new THREE.Color('#F6E05E'), // Gold Light
      new THREE.Color('#AA8A2E'), // Gold Dark
      new THREE.Color('#FFFFFF'), // White
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Posições em esfera ao redor da cena
      const radius = 100 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Cores variadas de dourado
      const color = goldColors[Math.floor(Math.random() * goldColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Tamanhos variados
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, []);

  // Animação de rotação e pulsação
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
      
      // Pulsação sutil das estrelas
      const time = clock.getElapsedTime();
      const geometry = pointsRef.current.geometry;
      const sizes = geometry.attributes.size.array as Float32Array;
      
      for (let i = 0; i < sizes.length; i++) {
        const originalSize = (sizes[i] % 2) + 0.5;
        sizes[i] = originalSize + Math.sin(time * 2 + i) * 0.3;
      }
      
      geometry.attributes.size.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Partículas de poeira estelar flutuantes
function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#D4AF37');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Posições mais próximas para efeito de poeira
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      colors[i3] = goldColor.r;
      colors[i3 + 1] = goldColor.g;
      colors[i3 + 2] = goldColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime();
      const geometry = pointsRef.current.geometry;
      const positionsArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positionsArray.length; i += 3) {
        // Movimento flutuante suave
        positionsArray[i] += Math.sin(time + i) * 0.001;
        positionsArray[i + 1] += Math.cos(time + i) * 0.001;
        positionsArray[i + 2] += Math.sin(time * 0.5 + i) * 0.002;

        // Resetar se sair muito longe
        if (Math.abs(positionsArray[i]) > 25) positionsArray[i] *= 0.9;
        if (Math.abs(positionsArray[i + 1]) > 25) positionsArray[i + 1] *= 0.9;
        if (Math.abs(positionsArray[i + 2]) > 10) positionsArray[i + 2] *= 0.9;
      }

      geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={1}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface StarFieldProps {
  className?: string;
}

export function StarField({ className = '' }: StarFieldProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        
        <Stars />
        <DustParticles />
        
        {/* Fog para profundidade */}
        <fog attach="fog" args={['#050505', 50, 200]} />
      </Canvas>
    </div>
  );
}
