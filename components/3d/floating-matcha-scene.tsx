"use client";

import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";

import { FloatingCup } from "@/components/3d/floating-cup";
import { LiquidTransferLayer } from "@/components/3d/liquid-transfer-layer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function CupCanvas({
  compact,
  reducedMotion
}: {
  compact: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.45]}
      camera={{ position: [0.18, 0.52, 4], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      shadows={!compact}
    >
      <ambientLight intensity={0.74} />
      <spotLight
        position={[2.2, 4.4, 3]}
        intensity={1.14}
        angle={0.5}
        penumbra={0.5}
        color="#f7f3ea"
        castShadow={!compact}
      />
      <pointLight position={[-1.8, 1.6, 1.1]} intensity={0.42} color="#c6dfaa" />
      <pointLight position={[0.9, -0.6, 1.4]} intensity={0.24} color="#ffb39f" />

      <mesh position={[0, 0.05, -1.2]}>
        <planeGeometry args={[3.2, 2.5]} />
        <meshBasicMaterial color="#c6dfaa" transparent opacity={0.1} />
      </mesh>

      <Float
        speed={reducedMotion ? 0.34 : 0.88}
        rotationIntensity={reducedMotion ? 0.05 : 0.16}
        floatIntensity={reducedMotion ? 0.08 : 0.24}
      >
        <FloatingCup
          position={compact ? [0.05, -0.02, 0] : [0.06, -0.02, 0]}
          scale={compact ? 0.98 : 1.08}
          branded
          layer="hero"
          speed={0.72}
        />
      </Float>

      <Float
        speed={reducedMotion ? 0.2 : 0.66}
        rotationIntensity={reducedMotion ? 0.04 : 0.1}
        floatIntensity={reducedMotion ? 0.05 : 0.12}
      >
        <FloatingCup
          position={compact ? [1.24, 0.18, -1.2] : [1.25, 0.22, -1.24]}
          scale={compact ? 0.39 : 0.44}
          layer="background"
          opacity={0.56}
          speed={0.6}
          phase={0.7}
        />
      </Float>

      {!compact ? (
        <Float
          speed={reducedMotion ? 0.2 : 0.6}
          rotationIntensity={reducedMotion ? 0.03 : 0.08}
          floatIntensity={reducedMotion ? 0.05 : 0.1}
        >
          <FloatingCup
            position={[-1.36, -0.18, -1.5]}
            scale={0.34}
            layer="background"
            opacity={0.46}
            speed={0.56}
            phase={1.3}
          />
        </Float>
      ) : null}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.08, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial transparent opacity={compact ? 0.1 : 0.16} />
      </mesh>

      <Environment preset="studio" />
    </Canvas>
  );
}

export function FloatingMatchaScene() {
  const reducedMotion = useReducedMotion();
  const compact = useMediaQuery("(max-width: 980px)");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-ink/12 bg-gradient-to-br from-matcha-100/28 via-cream/88 to-peach-100/26 shadow-premium-lg",
        compact ? "h-[360px]" : "h-[390px]"
      )}
      data-drip-anchor="hero-showcase"
      data-drip-order={1}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_56%_38%,rgba(198,223,170,0.35),transparent_42%),radial-gradient(circle_at_80%_12%,rgba(255,179,159,0.2),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(176deg,rgba(255,255,255,0.24),transparent_42%,rgba(30,39,22,0.08)_100%)]" />
      <div className="pointer-events-none absolute right-[8%] top-[10%] z-[2] h-12 w-12 rounded-full border border-matcha-500/20 bg-white/20 p-2 backdrop-blur-[1px]">
        <Image
          src="/logo/big-wiss-logo.jpeg"
          alt=""
          fill
          className="rounded-full object-cover opacity-22 blur-[0.45px]"
        />
      </div>

      <motion.div
        className={cn(
          "absolute overflow-hidden rounded-2xl border border-white/45 bg-[linear-gradient(150deg,rgba(250,252,245,0.9),rgba(231,239,221,0.66)_64%,rgba(255,230,222,0.42))] shadow-[0_24px_50px_rgba(32,44,22,0.16)]",
          compact
            ? "left-[8%] top-[18%] h-[64%] w-[84%]"
            : "left-[31%] top-[12%] h-[72%] w-[52%]"
        )}
        animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <CupCanvas compact={compact} reducedMotion={reducedMotion} />
      </motion.div>

      <div
        className={cn(
          "absolute rounded-xl border border-white/42 bg-white/58 p-3 backdrop-blur-sm",
          compact ? "left-[9%] top-[8%] w-[44%]" : "left-[7%] top-[11%] w-[20%]"
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-matcha-700/84">
          Origin Drop
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-ink/70">
          Dark matcha starts the gravity trail.
        </p>
      </div>

      <div
        className={cn(
          "absolute rounded-xl border border-white/42 bg-white/58 p-3 backdrop-blur-sm",
          compact ? "left-[12%] bottom-[8%] w-[45%]" : "left-[10%] bottom-[12%] w-[22%]"
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-matcha-700/84">
          Soft Landing
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-ink/70">
          Drip compresses, collects, and falls through.
        </p>
      </div>

      <LiquidTransferLayer compact={compact} reducedMotion={reducedMotion} />
    </div>
  );
}
