"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

import { FloatingCup } from "@/components/3d/floating-cup";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FloatingMatchaScene() {
  const shouldReduceMotion = useReducedMotion();
  const isSmallViewport = useMediaQuery("(max-width: 1024px)");

  if (shouldReduceMotion || isSmallViewport) {
    return (
      <div
        aria-hidden="true"
        className="relative h-[220px] w-full overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-matcha-100/70 via-cream to-peach-100 shadow-premium-md"
      >
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-matcha-300/70 blur-2xl" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="h-[300px] w-full overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-matcha-100/35 via-cream/60 to-peach-100/40 shadow-premium-md"
    >
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 0.65, 4.2], fov: 42 }}
      >
        <ambientLight intensity={0.66} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-2, 2, -1]} intensity={0.34} color="#ffb39f" />

        <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.35}>
          <FloatingCup position={[-0.75, -0.1, 0]} scale={0.96} speed={0.7} />
        </Float>
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.24}>
          <FloatingCup position={[0.95, 0.15, -0.35]} scale={0.72} speed={0.96} />
        </Float>
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.18}>
          <FloatingCup position={[0.1, -0.2, -1]} scale={0.56} speed={1.1} />
        </Float>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <shadowMaterial transparent opacity={0.16} />
        </mesh>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
