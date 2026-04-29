"use client";

import { CSSProperties, useMemo } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Particle = {
  id: number;
  left: number;
  size: number;
  opacity: number;
  blur: number;
  delay: number;
  duration: number;
};

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 4 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.25,
    blur: 1 + Math.random() * 2,
    delay: Math.random() * 0.4 + id * 0.2,
    duration: 8
  }));
}

export function FallingMatchaParticles() {
  const reducedMotion = useReducedMotion();
  const particles = useMemo(() => createParticles(reducedMotion ? 8 : 15), [reducedMotion]);

  return (
    <div className="matcha-particles-root" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="matcha-particle"
          style={
            {
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
