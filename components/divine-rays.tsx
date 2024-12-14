// components/divineRays.tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UniformsType {
  time: { value: number };
}

export function DivineRays(): JSX.Element {
  const rays = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial & { uniforms: UniformsType }>(null);

  // Define shaders as constants
  const VERTEX_SHADER = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = length(vUv - center);
      
      // Create rays
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      float rays = abs(sin(angle * 12.0 + time));
      
      // Fade out from center
      float fade = smoothstep(1.0, 0.0, dist);
      
      // Pulse
      float pulse = 0.5 + 0.5 * sin(time * 0.5);
      
      // Combine effects
      float alpha = fade * rays * pulse * 0.5;
      
      vec3 color = mix(vec3(1.0, 0.85, 0.1), vec3(1.0, 0.95, 0.4), pulse);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useEffect(() => {
    if (material.current) {
      material.current.uniforms = {
        time: { value: 0 }
      };
    }
  }, []);

  useFrame(({ clock }) => {
    if (material.current?.uniforms) {
      material.current.uniforms.time.value = clock.getElapsedTime();
    }
    if (rays.current) {
      rays.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={rays} scale={[50, 50, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}