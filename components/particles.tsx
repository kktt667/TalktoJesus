// components/particles.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

interface ParticleProps {
  count?: number;
}

export function Particles({ count = 5000 }: ParticleProps) {
  const points = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  // Create particles with golden divine colors
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z
    }
    return positions;
  }, [count]);

  // Animate particles
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
      points.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.3;
    }
    if (light.current) {
      light.current.intensity = 1 + Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        ref={light}
        position={[0, 0, 10]}
        color="#ffd700"
        intensity={1.5}
      />
      <Points
        ref={points}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffd700"
          size={0.1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>
    </>
  );
}