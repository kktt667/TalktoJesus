// components/divine-glow.tsx
import { useRef, useEffect } from 'react';

interface DivineGlowProps {
  color?: string;
  size?: number;
  intensity?: number;
  speed?: number;
}

export function DivineGlow({
  color = '#ffd700',
  size = 200,
  intensity = 0.5,
  speed = 1
}: DivineGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = glowRef.current;
    if (!element) return;

    const updateGlow = (timestamp: number) => {
      const pulse = Math.sin(timestamp * 0.001 * speed) * 0.5 + 0.5;
      element.style.opacity = (0.3 + pulse * 0.3 * intensity).toString();
      element.style.transform = `scale(${1 + pulse * 0.1})`;
      requestAnimationFrame(updateGlow);
    };

    const animationFrame = requestAnimationFrame(updateGlow);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed, intensity]);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at center, 
          ${color}66 0%, 
          ${color}33 30%, 
          ${color}11 60%, 
          transparent 70%
        )`,
        transition: 'all 0.3s ease-in-out'
      }}
    />
  );
}