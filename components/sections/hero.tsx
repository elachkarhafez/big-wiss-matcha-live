"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_CUPS_LEFT = [
  { src: "/product-cups/v3-classic.png", alt: "Classic Matcha" },
  { src: "/product-cups/v3-cream.png", alt: "Cream Top Matcha" },
  { src: "/product-cups/v3-iced.png", alt: "Iced Matcha" },
];

const HERO_CUPS_RIGHT = [
  { src: "/product-cups/v3-strawberry.png", alt: "Strawberry Matcha" },
  { src: "/product-cups/v3-dirty.png", alt: "Dirty Matcha" },
  { src: "/product-cups/v3-vanilla.png", alt: "Vanilla Matcha" },
];

const MOBILE_ROW1 = [
  { src: "/product-cups/v3-classic.png", alt: "Classic Matcha" },
  { src: "/product-cups/v3-cream.png", alt: "Cream Top Matcha" },
  { src: "/product-cups/v3-iced.png", alt: "Iced Matcha" },
];
const MOBILE_ROW2 = [
  { src: "/product-cups/v3-strawberry.png", alt: "Strawberry Matcha" },
  { src: "/product-cups/v3-dirty.png", alt: "Dirty Matcha" },
  { src: "/product-cups/v3-vanilla.png", alt: "Vanilla Matcha" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(160deg, #0d2a1a 0%, #1a3d28 30%, #122e20 65%, #0d2218 100%)",
        overflowX: "clip",
      }}
    >
      {/* Cinematic background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Center bloom — vivid */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 85% 70% at 50% 25%, rgba(110, 210, 150, 0.26) 0%, transparent 65%)" }} />
        {/* Left theatrical fill */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 50% 90% at -5% 55%, rgba(70, 180, 120, 0.15) 0%, transparent 65%)" }} />
        {/* Right theatrical fill */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 50% 90% at 105% 55%, rgba(50, 160, 100, 0.15) 0%, transparent 65%)" }} />
        {/* Floor bounce */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 25% at 50% 102%, rgba(150, 220, 170, 0.12) 0%, transparent 70%)" }} />
        {/* Animated sweep shimmer */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(110deg, transparent 35%, rgba(125,206,160,0.07) 50%, transparent 65%)", animation: "heroShimmer 5s ease-in-out infinite" }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(5,15,8,0.55) 100%)" }} />
      </div>

      {/* ===================== MOBILE LAYOUT ===================== */}
      <div className="md:hidden relative z-10 flex flex-col items-center min-h-screen pt-24 pb-12 px-5">

        {/* NOW OPEN badge */}
        <motion.div
          className="flex flex-col items-center mb-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ border: "1px solid rgba(125,206,160,0.45)", background: "rgba(125,206,160,0.13)" }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7dcea0]">Now Open · Dearborn, MI</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display font-bold text-white text-center leading-[0.92] tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(2.8rem, 13vw, 4rem)" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          BIG ENERGY.
          <br />
          <span style={{ background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            REAL MATCHA.
          </span>
        </motion.h1>

        {/* Cups — all 6 in 2 rows of 3 */}
        <motion.div
          className="w-full relative mb-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.65 }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(125,206,160,0.28) 0%, transparent 70%)" }} />

          {/* Row 1 */}
          <div className="flex items-end justify-center gap-2">
            {MOBILE_ROW1.map((cup, i) => (
              <motion.div key={cup.src} className="relative flex-shrink-0"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: i === 1 ? 0 : "5vw" }}>
                <div style={{ animation: `gentleFloat ${3.8 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}>
                  <div style={{ position: "relative", width: "27vw", height: "72vw", minWidth: 90, minHeight: 220 }}>
                    <Image src={cup.src} alt={cup.alt} fill sizes="27vw" className="object-contain"
                      style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 22px rgba(125,206,160,0.18))" }} priority />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logo between rows */}
          <motion.div className="flex flex-col items-center py-3"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}>
            <div style={{ position: "relative", width: "44vw", height: "44vw" }}>
              <Image src="/logo/logo-v2.png" alt="Big Wiss Matcha" fill className="object-contain" />
            </div>
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/35 mt-1">
              Dearborn, MI · Premium Matcha
            </p>
          </motion.div>

          {/* Row 2 */}
          <div className="flex items-end justify-center gap-2">
            {MOBILE_ROW2.map((cup, i) => (
              <motion.div key={cup.src} className="relative flex-shrink-0"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: i === 1 ? 0 : "5vw" }}>
                <div style={{ animation: `gentleFloat ${4.4 + i * 0.2}s ease-in-out infinite`, animationDelay: `${(i + 3) * 0.15}s` }}>
                  <div style={{ position: "relative", width: "27vw", height: "72vw", minWidth: 90, minHeight: 220 }}>
                    <Image src={cup.src} alt={cup.alt} fill sizes="27vw" className="object-contain"
                      style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 22px rgba(125,206,160,0.18))" }} priority />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description + CTAs */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5 }}
        >
          <p className="text-white/55 text-sm max-w-xs mx-auto leading-relaxed mb-6">
            Premium matcha, crafted fresh every pop-up. Find us in Dearborn — or book us for your next event.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link href="/catering"
              className="w-full inline-flex items-center justify-center rounded-full bg-white py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
              Book an Event
            </Link>
            <a href="https://www.instagram.com/bigwissmatcha/" target="_blank" rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center rounded-full py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all"
              style={{ border: "1.5px solid rgba(125,206,160,0.35)", background: "rgba(125,206,160,0.09)" }}>
              Follow @bigwissmatcha →
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white/25">
            <span>Now Open</span><span>·</span><span>Dearborn & SE Michigan</span><span>·</span><span>Premium Craft Matcha</span>
          </div>
        </motion.div>
      </div>

      {/* ===================== DESKTOP LAYOUT ===================== */}
      <div className="hidden md:flex relative z-10 flex-col items-center justify-center min-h-screen px-4 pt-[90px] pb-12">

        {/* Tagline */}
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/45 mb-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          Founder-Led &nbsp;&middot;&nbsp; Dearborn, MI &nbsp;&middot;&nbsp; Premium Matcha
        </motion.p>

        {/* Title */}
        <motion.h1
          className="font-display font-bold text-white text-center leading-[0.95] tracking-[-0.03em] mb-4"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          BIG ENERGY.
          <br />
          <span style={{ background: "linear-gradient(135deg, #7dcea0 0%, #a8e6c3 50%, #c4f0d5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            REAL MATCHA.
          </span>
        </motion.h1>

        {/* Cups + center logo row */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-44 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(125,206,160,0.26) 0%, transparent 70%)" }} />

          <div className="flex items-center w-full">
            {/* Left cups */}
            {HERO_CUPS_LEFT.map((cup, i) => (
              <motion.div key={cup.src} className="relative flex-shrink-0"
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: i === 0 ? "4vw" : i === 2 ? "2vw" : 0 }}>
                <div style={{ animation: `gentleFloat ${3.5 + i * 0.25}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                  <div style={{ position: "relative", width: "9vw", height: "30vw", minWidth: 80, minHeight: 240 }}>
                    <Image src={cup.src} alt={cup.alt} fill sizes="9vw" className="object-contain"
                      style={{ filter: "drop-shadow(0 16px 38px rgba(0,0,0,0.55)) drop-shadow(0 0 32px rgba(125,206,160,0.2))" }} priority />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center — Logo + NOW OPEN */}
            <motion.div className="flex-1 flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <div style={{ position: "relative", width: "min(20vw, 200px)", height: "min(20vw, 200px)" }}>
                <Image src="/logo/logo-v2.png" alt="Big Wiss Matcha" fill className="object-contain"
                  style={{ filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.45))" }} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ border: "1px solid rgba(125,206,160,0.45)", background: "rgba(125,206,160,0.13)" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7dcea0] whitespace-nowrap">Now Open</span>
              </div>
            </motion.div>

            {/* Right cups */}
            {HERO_CUPS_RIGHT.map((cup, i) => (
              <motion.div key={cup.src} className="relative flex-shrink-0"
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i + 3) * 0.08, duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: i === 0 ? "2vw" : i === 2 ? "4vw" : 0 }}>
                <div style={{ animation: `gentleFloat ${3.5 + (i + 3) * 0.25}s ease-in-out infinite`, animationDelay: `${(i + 3) * 0.2}s` }}>
                  <div style={{ position: "relative", width: "9vw", height: "30vw", minWidth: 80, minHeight: 240 }}>
                    <Image src={cup.src} alt={cup.alt} fill sizes="9vw" className="object-contain"
                      style={{ filter: "drop-shadow(0 16px 38px rgba(0,0,0,0.55)) drop-shadow(0 0 32px rgba(125,206,160,0.2))" }} priority />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
          <p className="text-white/55 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
            Premium matcha, crafted fresh every pop-up. Find us in Dearborn — or book us for your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catering"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
              Book an Event
            </Link>
            <a href="https://www.instagram.com/bigwissmatcha/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all"
              style={{ border: "1.5px solid rgba(125,206,160,0.35)", background: "rgba(125,206,160,0.09)" }}>
              Follow @bigwissmatcha →
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
            <span>Now Open</span><span>·</span><span>Dearborn & SE Michigan</span><span>·</span><span>Premium Craft Matcha</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroShimmer {
          0%, 100% { opacity: 0; transform: translateX(-10%); }
          50% { opacity: 1; transform: translateX(10%); }
        }
      `}</style>
    </section>
  );
}
