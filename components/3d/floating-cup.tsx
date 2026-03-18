"use client";

import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Shape, SRGBColorSpace } from "three";

type CupLayer = "hero" | "support" | "background";

type FloatingCupProps = {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  branded?: boolean;
  layer?: CupLayer;
  opacity?: number;
  phase?: number;
};

function useHeartShape() {
  return useMemo(() => {
    const heart = new Shape();
    heart.moveTo(0, 0.12);
    heart.bezierCurveTo(0, 0.26, -0.2, 0.26, -0.2, 0.12);
    heart.bezierCurveTo(-0.2, -0.02, 0, -0.17, 0, -0.24);
    heart.bezierCurveTo(0, -0.17, 0.2, -0.02, 0.2, 0.12);
    heart.bezierCurveTo(0.2, 0.26, 0, 0.26, 0, 0.12);
    return heart;
  }, []);
}

export function FloatingCup({
  position,
  scale = 1,
  speed = 0.8,
  branded = false,
  layer = "support",
  opacity = 1,
  phase = 0
}: FloatingCupProps) {
  const groupRef = useRef<Group>(null);
  const heartShape = useHeartShape();
  const logoTexture = useTexture("/logo/big-wiss-logo.jpeg");
  logoTexture.colorSpace = SRGBColorSpace;

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime() + phase;
    const floatStrength = layer === "hero" ? 0.08 : layer === "background" ? 0.03 : 0.05;
    const baseY = position[1] + Math.sin(elapsed * speed) * floatStrength;
    groupRef.current.position.y = baseY;

    if (layer === "hero" || branded) {
      groupRef.current.rotation.y = Math.sin(elapsed * speed * 0.45) * 0.14;
      groupRef.current.rotation.z = Math.sin(elapsed * speed * 0.52) * 0.02;
    } else {
      groupRef.current.rotation.y =
        Math.sin(elapsed * speed * 0.52) * 0.2 + elapsed * 0.08;
      groupRef.current.rotation.z = Math.sin(elapsed * speed * 0.7) * 0.05;
    }
  });

  const shellOpacity = (layer === "background" ? 0.34 : 0.58) * opacity;
  const liquidOpacity = (layer === "background" ? 0.46 : 0.88) * opacity;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.62, 0.48, 1.32, 72, 1, true]} />
        <meshPhysicalMaterial
          color="#f8f6ef"
          roughness={0.08}
          metalness={0.02}
          transmission={0.9}
          thickness={0.4}
          transparent
          opacity={shellOpacity}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.65, 0]}>
        <sphereGeometry args={[0.48, 64, 42, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#f8f6ef"
          roughness={0.08}
          metalness={0.02}
          transmission={0.9}
          thickness={0.4}
          transparent
          opacity={shellOpacity}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.52, 0.44, 0.98, 64]} />
        <meshPhysicalMaterial
          color="#58713a"
          roughness={0.22}
          metalness={0.01}
          transmission={0.14}
          thickness={0.24}
          transparent
          opacity={liquidOpacity}
          clearcoat={0.42}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.56, 0]}>
        <sphereGeometry args={[0.44, 56, 36, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#4a6132"
          roughness={0.25}
          metalness={0.02}
          transmission={0.08}
          thickness={0.22}
          transparent
          opacity={liquidOpacity}
        />
      </mesh>

      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.08, 56]} />
        <meshStandardMaterial color="#dce9cc" roughness={0.54} metalness={0.02} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.64, 0]}>
        <sphereGeometry args={[0.66, 56, 34, 0, Math.PI * 2, 0, 1.05]} />
        <meshPhysicalMaterial
          color="#fbfaf7"
          roughness={0.11}
          metalness={0.03}
          transmission={0.74}
          thickness={0.26}
          transparent
          opacity={0.82 * opacity}
          clearcoat={1}
          clearcoatRoughness={0.11}
        />
      </mesh>

      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.075, 56]} />
        <meshPhysicalMaterial
          color="#faf8f3"
          roughness={0.18}
          metalness={0.03}
          transmission={0.6}
          thickness={0.14}
          transparent
          opacity={0.82 * opacity}
        />
      </mesh>

      <mesh castShadow position={[0.14, 1.05, -0.02]} rotation={[0.08, 0.02, 0.04]}>
        <cylinderGeometry args={[0.042, 0.041, 1.55, 24]} />
        <meshStandardMaterial color="#f3f0e8" roughness={0.2} metalness={0.08} />
      </mesh>

      <mesh
        position={[0.03, 0.88, 0.14]}
        rotation={[-Math.PI / 2, 0.08, -0.06]}
        scale={0.12}
      >
        <shapeGeometry args={[heartShape]} />
        <meshStandardMaterial color="#ffb39f" emissive="#f5aa95" emissiveIntensity={0.12} />
      </mesh>

      {branded ? (
        <>
          <mesh position={[0, -0.04, 0.56]}>
            <circleGeometry args={[0.25, 46]} />
            <meshPhysicalMaterial
              color="#f8f5ec"
              roughness={0.2}
              metalness={0.02}
              transparent
              opacity={0.97}
            />
          </mesh>
          <mesh position={[0, -0.04, 0.562]}>
            <planeGeometry args={[0.34, 0.34]} />
            <meshBasicMaterial map={logoTexture} transparent opacity={1} />
          </mesh>
        </>
      ) : null}
    </group>
  );
}
