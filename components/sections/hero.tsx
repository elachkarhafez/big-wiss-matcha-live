"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_CUPS_LEFT = [
  { src: "/product-cups/classic-matcha.png", alt: "Classic Matcha" },
  { src: "/product-cups/cream-top.png", alt: "Cream Top Matcha" },
  { src: "/product-cups/iced-matcha.png", alt: "Iced Matcha" },
];

const HERO_CUPS_RIGHT = [
  { src: "/product-cups/strawberry-matcha.png", alt: "Strawberry Matcha" },
  { src: "/product-cups/dirty-matcha.png", alt: "Dirty Matcha" },
  { src: "/product-cups/vanilla-matcha.png", alt: "Vanilla Matcha" },
];

const ALL_CUPS = [...HERO_CUPS_LEFT, ...HERO_CUPS_RIGHT];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1f14 0%, #122a1c 35%, #0f2318 70%, #0a1a11 100%)",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(100, 180, 130, 0.07) 0%, transparent 70%)" }} />
      </div>

      {/* ===================== MOBILE LAYOUT ===================== */}
      <div className="md:hidden relative z-10 flex flex-col items-center min-h-screen pt-24 pb-12 px-5">

        {/* Tagline */}
        <motion.p
          className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-4 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        >
          Founder-Led · Dearborn, MI · Premium Matcha
        </motion.p>

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

        {/* COMING SOON — centered, large */}
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7dcea0]/30 bg-[#7dcea0]/10 px-4 py-1.5 mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7dcea0]">Now Booking · Summer 2026</span>
          </div>
          <h2
            className="font-display font-bold text-center"
            style={{
              fontSize: "clamp(2.6rem, 14vw, 4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            COMING<br />SOON
          </h2>
        </motion.div>

        {/* Cups — full width horizontal row */}
        <motion.div
          className="w-full relative mb-6"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-24 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(125,206,160,0.15) 0%, transparent 70%)" }} />

          <div className="flex items-end justify-center">
            {ALL_CUPS.map((cup, i) => {
              const mid = (ALL_CUPS.length - 1) / 2;
              const dist = Math.abs(i - mid);
              const mb = dist * 12;
              return (
                <motion.div
                  key={cup.src}
                  className="relative flex-shrink-0"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.06, duration: 0.45, ease: "easeOut" }}
                  style={{ marginBottom: mb }}
                >
                  <div style={{ animation: `gentleFloat ${3.5 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}>
                    <div style={{ position: "relative", width: "14.5vw", height: "48vw", minWidth: 48, minHeight: 160 }}>
                      <Image src={cup.src} alt={cup.alt} fill sizes="15vw" className="object-contain"
                        style={{ filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.5))" }} priority quality={90} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Description + CTAs */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed mb-6">
            Big Wiss Matcha is filling up fast — lock in your event date and we&apos;ll have a full proposal back within 24 hours.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link href="/catering"
              className="w-full inline-flex items-center justify-center rounded-full bg-white py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              Book Catering Now
            </Link>
            <Link href="/catering"
              className="w-full inline-flex items-center justify-center rounded-full py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all"
              style={{ border: "1.5px solid rgba(125,206,160,0.3)", background: "rgba(125,206,160,0.07)" }}>
              Save Your Spot →
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white/25">
            <span>24hr Response</span><span>·</span><span>Dearborn & SE Michigan</span><span>·</span><span>No Commitment</span>
          </div>
        </motion.div>
      </div>

      {/* ===================== DESKTOP LAYOUT ===================== */}
      <div className="hidden md:flex relative z-10 flex-col items-center justify-center min-h-screen px-4 pt-[90px] pb-12">

        {/* Tagline */}
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40 mb-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          Founder-Led &nbsp;&middot;&nbsp; Dearborn, MI &nbsp;&middot;&nbsp; Premium Matcha
        </motion.p>

        {/* Title */}
        <motion.h1
          className="font-display font-bold text-white text-center leading-[0.95] tracking-[-0.03em] mb-10"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          BIG ENERGY.
          <br />
          <span style={{ background: "linear-gradient(135deg, #7dcea0 0%, #a8e6c3 50%, #c4f0d5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            REAL MATCHA.
          </span>
        </motion.h1>

        {/* Cups + Coming Soon row */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center bottom, rgba(125,206,160,0.13) 0%, transparent 70%)" }} />

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
                      style={{ filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.5))" }} priority quality={90} />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center — COMING SOON */}
            <motion.div className="flex-1 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7dcea0]/30 bg-[#7dcea0]/10 px-3 py-1 mb-4">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7dcea0] whitespace-nowrap">Now Booking</span>
              </div>
              <h2 className="font-display font-bold text-center"
                style={{
                  fontSize: "clamp(2.2rem, 6.5vw, 7rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                COMING<br />SOON
              </h2>
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
                      style={{ filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.5))" }} priority quality={90} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5 }}>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
            Big Wiss Matcha is filling up fast — lock in your event date and we&apos;ll have a full proposal back within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catering"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              Book Catering Now
            </Link>
            <Link href="/catering"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all"
              style={{ border: "1.5px solid rgba(125,206,160,0.3)", background: "rgba(125,206,160,0.07)" }}>
              Save Your Spot →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
            <span>24hr Response</span><span>·</span><span>Dearborn & SE Michigan</span><span>·</span><span>No Commitment to Inquire</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
