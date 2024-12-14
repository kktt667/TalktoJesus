// components/particles.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null);

  // Create a larger spread for particles
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;     // x coordinate
    positions[i + 1] = (Math.random() - 0.5) * 100; // y coordinate
    positions[i + 2] = (Math.random() - 0.5) * 50;  // z coordinate
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        size={0.15}
        sizeAttenuation
        color="#ffd700"
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );}