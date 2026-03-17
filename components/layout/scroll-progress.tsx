"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] h-[3px] w-full origin-left bg-gradient-to-r from-matcha-300 via-matcha-500 to-peach-300 shadow-[0_0_16px_rgba(122,161,103,0.4)]"
      style={{ scaleX }}
    />
  );
}
