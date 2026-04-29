"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { CTA_COPY } from "@/lib/constants";

const HERO_CUPS = [
  { src: "/product-cups/classic-matcha.png", alt: "Classic Matcha", label: "Classic" },
  { src: "/product-cups/cream-top.png", alt: "Cream Top Matcha", label: "Cream Top" },
  { src: "/product-cups/iced-matcha.png", alt: "Iced Matcha", label: "Iced" },
  { src: "/product-cups/strawberry-matcha.png", alt: "Strawberry Matcha", label: "Strawberry" },
  { src: "/product-cups/dirty-matcha.png", alt: "Dirty Matcha", label: "Dirty" },
  { src: "/product-cups/vanilla-matcha.png", alt: "Vanilla Matcha", label: "Vanilla" },
];

const DRINK_FLAVORS = [
  "Classic",
  "Cream Top",
  "Iced",
  "Strawberry",
  "Dirty",
  "Vanilla"
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1f14 0%, #122a1c 35%, #0f2318 70%, #0a1a11 100%)",
      }}
    >
      {/* Premium background - single subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(100, 180, 130, 0.07) 0%, transparent 70%)",
          }}
        />
        {/* Soft top light */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(125, 206, 160, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-[100px] pb-12">

        {/* Typography - tight, editorial */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40 mb-6">
            Founder-Led &nbsp;&middot;&nbsp; Dearborn, MI &nbsp;&middot;&nbsp; Premium Matcha
          </p>

          <h1
            className="font-display font-bold text-white leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.2rem, 7vw, 7rem)" }}
          >
            BIG ENERGY.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7dcea0 0%, #a8e6c3 50%, #c4f0d5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              REAL MATCHA.
            </span>
          </h1>

          <p className="mt-6 text-sm md:text-base font-light text-white/50 max-w-md mx-auto leading-relaxed tracking-wide">
            Premium matcha pop-up built for events that need
            standout flavor and unforgettable energy.
          </p>
        </motion.div>

        {/* ===== CUPS + COMING SOON - HORIZONTAL LAYOUT ===== */}
        <motion.div
          className="relative w-full max-w-7xl mx-auto mt-2 mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Soft glow beneath cups */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[200px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(125, 206, 160, 0.12) 0%, transparent 70%)",
            }}
          />

          {/* Cup row with Coming Soon in middle */}
          <div className="flex items-end justify-center gap-0 md:gap-1 lg:gap-2">
            {/* Left cups (0-2) */}
            {HERO_CUPS.slice(0, 3).map((cup, i) => {
              const dist = Math.abs(i - 1);
              const yOffset = dist * 24;

              return (
                <motion.div
                  key={cup.src}
                  className="relative flex-shrink-0 group cursor-pointer"
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  style={{ marginBottom: yOffset }}
                >
                  <div
                    className="relative transition-transform duration-300 ease-out group-hover:-translate-y-4"
                    style={{
                      animation: `gentleFloat ${3.5 + i * 0.2}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div className="relative w-28 h-[340px] md:w-32 md:h-[400px] lg:w-40 lg:h-[480px]">
                      <Image
                        src={cup.src}
                        alt={cup.alt}
                        fill
                        sizes="(max-width: 768px) 28vw, (max-width: 1024px) 32vw, 40vw"
                        className="object-contain"
                        style={{
                          filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
                        }}
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Coming Soon Badge + Drink Flavors in Middle */}
            <motion.div
              className="flex flex-col items-center justify-end px-2 md:px-4 lg:px-6 mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7dcea0]/30 bg-[#7dcea0]/10 px-3 py-1.5 mb-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7dcea0]">Now Booking</span>
              </div>

              <div className="flex flex-col items-center gap-2 md:gap-3">
                {DRINK_FLAVORS.map((flavor, idx) => (
                  <motion.div
                    key={flavor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05, duration: 0.4 }}
                  >
                    <h3
                      className="font-display font-bold text-white text-center"
                      style={{
                        fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase"
                      }}
                    >
                      {flavor}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <h2
                className="font-display font-bold text-white text-center mt-6"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
              >
                <span style={{ background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  COMING SOON
                </span>
              </h2>
            </motion.div>

            {/* Right cups (3-5) */}
            {HERO_CUPS.slice(3, 6).map((cup, i) => {
              const dist = Math.abs(i - 1);
              const yOffset = dist * 24;

              return (
                <motion.div
                  key={cup.src}
                  className="relative flex-shrink-0 group cursor-pointer"
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i + 3) * 0.07, duration: 0.5, ease: "easeOut" }}
                  style={{ marginBottom: yOffset }}
                >
                  <div
                    className="relative transition-transform duration-300 ease-out group-hover:-translate-y-4"
                    style={{
                      animation: `gentleFloat ${3.5 + (i + 3) * 0.2}s ease-in-out infinite`,
                      animationDelay: `${(i + 3) * 0.15}s`,
                    }}
                  >
                    <div className="relative w-28 h-[340px] md:w-32 md:h-[400px] lg:w-40 lg:h-[480px]">
                      <Image
                        src={cup.src}
                        alt={cup.alt}
                        fill
                        sizes="(max-width: 768px) 28vw, (max-width: 1024px) 32vw, 40vw"
                        className="object-contain"
                        style={{
                          filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
                        }}
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Description below cups and coming soon */}
        <motion.div
          className="text-center mt-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            Big Wiss Matcha is filling up fast. Lock in your event date now.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            href="/catering"
            className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Book Catering Now
          </Link>

          <Link
            href="/catering"
            className="inline-flex items-center justify-center rounded-full px-10 py-[14px] text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200"
            style={{
              border: "1.5px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(4px)",
            }}
          >
            Save Your Spot →
          </Link>
        </motion.div>
      </div>

      {/* Minimal CSS animation */}
      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
