// components/particle-field.tsx
// Canvas wrapper for <Particles>. Client-only — import via next/dynamic with
// ssr: false, since WebGL has no server-side equivalent.
import { Canvas } from '@react-three/fiber';
import { Particles } from './particles';

export default function ParticleField({ count = 6000 }: { count?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 60], fov: 75 }}
      // The field is decorative; keep it out of the accessibility tree and
      // off the pointer so it never intercepts clicks on the content above.
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
      // Cap DPR so the particle count doesn't get multiplied by a retina
      // pixel ratio on high-density displays.
      dpr={[1, 1.5]}
    >
      <Particles count={count} />
    </Canvas>
  );
}
