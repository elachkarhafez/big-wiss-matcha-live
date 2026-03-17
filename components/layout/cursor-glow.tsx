"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { stiffness: 220, damping: 26, mass: 0.18 });
  const y = useSpring(mouseY, { stiffness: 220, damping: 26, mass: 0.18 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncEnabled = () => setEnabled(mediaQuery.matches);
    syncEnabled();

    const onMove = (event: MouseEvent) => {
      if (!mediaQuery.matches) {
        return;
      }
      mouseX.set(event.clientX - 70);
      mouseY.set(event.clientY - 70);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    mediaQuery.addEventListener("change", syncEnabled);

    return () => {
      window.removeEventListener("mousemove", onMove);
      mediaQuery.removeEventListener("change", syncEnabled);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[70] hidden h-36 w-36 rounded-full bg-matcha-300/20 blur-2xl lg:block"
      style={{ x, y }}
    />
  );
}
