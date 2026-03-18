"use client";

import { motion } from "framer-motion";

type LiquidTransferLayerProps = {
  compact?: boolean;
  reducedMotion?: boolean;
};

const desktopPoints = {
  left: ["21%", "24%", "31%", "45%", "54%", "42%", "30%"],
  top: ["19%", "24%", "33%", "41%", "54%", "66%", "78%"]
};

const compactPoints = {
  left: ["18%", "23%", "31%", "48%", "57%", "45%", "34%"],
  top: ["18%", "24%", "34%", "44%", "56%", "68%", "79%"]
};

export function LiquidTransferLayer({
  compact = false,
  reducedMotion = false
}: LiquidTransferLayerProps) {
  const points = compact ? compactPoints : desktopPoints;

  return (
    <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
      <svg
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="showcase-dark-matcha" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(74, 97, 50, 0.58)" />
            <stop offset="58%" stopColor="rgba(58, 78, 36, 0.5)" />
            <stop offset="100%" stopColor="rgba(49, 65, 30, 0.45)" />
          </linearGradient>
        </defs>
        <path
          d="M 200 110 C 260 142, 330 198, 452 252 C 560 300, 564 382, 462 448 C 392 494, 352 544, 312 585"
          fill="none"
          stroke="url(#showcase-dark-matcha)"
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeOpacity={0.36}
        />
      </svg>

      {!reducedMotion ? (
        <>
          <motion.div
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[45%] bg-gradient-to-b from-[#5a7540] via-[#4a6132] to-[#354826] shadow-[0_5px_14px_rgba(42,56,28,0.42)]"
            animate={{
              left: points.left,
              top: points.top,
              scaleY: [1.15, 1.5, 1.95, 1.34, 1.05, 1.22, 0.98],
              scaleX: [1.05, 0.9, 0.72, 0.9, 1.1, 0.95, 1.08]
            }}
            transition={{
              duration: compact ? 5.9 : 6.7,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "linear",
              times: [0, 0.12, 0.28, 0.46, 0.64, 0.82, 1]
            }}
          />
          <motion.div
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4a6132]/78"
            animate={{
              left: points.left.slice(1),
              top: points.top.slice(1),
              opacity: [0, 0.52, 0.36, 0.1, 0],
              scale: [0.5, 0.9, 0.72, 0.4, 0.2]
            }}
            transition={{
              duration: compact ? 4.8 : 5.6,
              repeat: Infinity,
              repeatDelay: 1.1,
              ease: "easeInOut",
              delay: 0.34
            }}
          />
          <motion.div
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#40532d]/65 blur-[0.2px]"
            style={{ left: points.left[6], top: points.top[6] }}
            animate={{ scale: [0.5, 1.2, 1.6], opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 6, delay: 5.6 }}
          />
        </>
      ) : (
        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4a6132]/82"
          style={{ left: points.left[4], top: points.top[4] }}
        />
      )}
    </div>
  );
}
