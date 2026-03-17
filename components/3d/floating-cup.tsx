"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type FloatingCupProps = {
  position: [number, number, number];
  scale?: number;
  speed?: number;
};

export function FloatingCup({
  position,
  scale = 1,
  speed = 0.9
}: FloatingCupProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(elapsed * speed) * 0.08;
    groupRef.current.rotation.y = elapsed * 0.28;
    groupRef.current.rotation.z = Math.sin(elapsed * speed * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.58, 0.8, 40]} />
        <meshStandardMaterial color="#f8f2e8" roughness={0.25} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.64, 0.64, 0.12, 42]} />
        <meshStandardMaterial color="#7aa167" roughness={0.5} metalness={0.08} />
      </mesh>

      <mesh position={[0.69, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.04, 16, 44]} />
        <meshStandardMaterial color="#f8f2e8" roughness={0.3} metalness={0.09} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.43, 0]} receiveShadow>
        <circleGeometry args={[0.7, 40]} />
        <meshStandardMaterial color="#c6dfaa" roughness={0.8} metalness={0.02} />
      </mesh>
    </group>
  );
}
