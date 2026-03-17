"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MatchaDropTransition() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div aria-hidden="true" className="relative my-2 h-8">
        <div className="mx-auto h-3 w-3 rounded-full bg-matcha-500/45" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="relative my-2 h-12 overflow-hidden">
      <motion.div
        className="mx-auto h-4 w-4 rounded-full bg-matcha-500/80 shadow-[0_0_20px_rgba(122,161,103,0.55)]"
        initial={{ y: -18, opacity: 0.2, scale: 0.85 }}
        whileInView={{ y: 16, opacity: 1, scale: [0.85, 1, 1.1, 0.95] }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.62, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-8 h-1 w-14 -translate-x-1/2 rounded-full bg-matcha-300/45 blur-[1px]"
        initial={{ opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.34 }}
      />
    </div>
  );
}
