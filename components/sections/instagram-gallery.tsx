"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const IG = "https://www.instagram.com/bigwissmatcha/";

// Real content pulled from @bigwissmatcha
type Tile = {
  kind: "video" | "photo";
  src: string;
  poster?: string;
  caption: string;
  href: string;
  span?: boolean;
};

const TILES: Tile[] = [
  {
    kind: "video",
    src: "/videos/strawberry-matcha.mp4",
    poster: "/instagram/strawberry-matcha.jpg",
    caption: "Strawberry matcha, made my way 🍓",
    href: "https://www.instagram.com/bigwissmatcha/reel/DZLyxLiRVqE/",
  },
  {
    kind: "video",
    src: "/videos/matcha-cart.mp4",
    poster: "/instagram/matcha-cart.jpg",
    caption: "The cart is up & running — book us for catering",
    href: "https://www.instagram.com/big_wissss/reel/DZBXyblR7wO/",
  },
  {
    kind: "photo",
    src: "/instagram/late-night-booth.jpg",
    caption: "Our first ever late-night pop-up ✨",
    href: "https://www.instagram.com/big_wissss/reel/DaCGGuoRz_L/",
  },
  {
    kind: "photo",
    src: "/instagram/making-matcha.jpg",
    caption: "Whisked fresh, every single cup",
    href: "https://www.instagram.com/big_wissss/reel/DZOZFuWJ0kb/",
  },
  {
    kind: "photo",
    src: "/instagram/late-night-poster.jpg",
    caption: "Late Night Matcha — you can't miss this",
    href: "https://www.instagram.com/bigwissmatcha/p/DZyx2SQjcJv/",
  },
  {
    kind: "photo",
    src: "/instagram/big-wiss-cup.jpg",
    caption: "What a taste. What a cup.",
    href: "https://www.instagram.com/bigwissmatcha/p/DYD34GFjZ7H/",
  },
];

function Tile({ tile, index }: { tile: Tile; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.a
      href={tile.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl"
      style={{ aspectRatio: "9 / 16", background: "#0a1a11" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {tile.kind === "video" ? (
        <video
          ref={videoRef}
          src={tile.src}
          poster={tile.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <Image
          src={tile.src}
          alt={tile.caption}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
          className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.12]"
        />
      )}

      {/* Cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,14,9,0.30) 0%, transparent 32%, transparent 55%, rgba(4,14,9,0.85) 100%)",
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Media-type chip */}
      <div className="absolute top-3 right-3 z-10">
        {tile.kind === "video" ? (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
              <polygon points="2,1 9,5 2,9" />
            </svg>
          </div>
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="3" />
              <circle cx="9" cy="9" r="1.6" fill="white" stroke="none" />
              <path d="M4 16l4.5-4.5 4 4 3-3L20 15" />
            </svg>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10">
        <p className="text-white text-[12px] md:text-[13px] leading-snug font-medium translate-y-1 opacity-90 group-hover:opacity-100 transition-all">
          {tile.caption}
        </p>
        <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7dcea0" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="#7dcea0" stroke="none" />
          </svg>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7dcea0]">
            View on Instagram
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function InstagramGallery() {
  const heroRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-28 px-5 md:px-10 lg:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1a11 0%, #061410 55%, #0a1a11 100%)",
        borderTop: "1px solid rgba(125,206,160,0.06)",
      }}
    >
      {/* ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 15% 10%, rgba(125,206,160,0.10) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 90% 85%, rgba(80,180,130,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ border: "1px solid rgba(125,206,160,0.3)", background: "rgba(125,206,160,0.07)" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7dcea0]">
              Straight from @bigwissmatcha
            </span>
          </div>

          <h2
            className="font-display font-bold text-white leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}
          >
            THE{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WISS LIFE
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Real pop-ups, real pours, real matcha. Straight off our feed.
          </p>
        </motion.div>

        {/* FEATURED cinematic hero video */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-4 md:mb-5"
          style={{ aspectRatio: "16 / 9" }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={heroRef}
            src="/videos/what-a-taste.mp4"
            poster="/instagram/what-a-taste.jpg"
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: "kenburns 20s ease-in-out infinite alternate" }}
          />

          {/* letterbox + vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,14,9,0.45) 0%, transparent 25%, transparent 45%, rgba(4,14,9,0.9) 100%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(4,14,9,0.5) 100%)",
            }}
          />
          {/* grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* overlay copy */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[#7dcea0] text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-2">
                  Latest Pop-Up · Dearborn, MI
                </p>
                <h3
                  className="font-display font-bold text-white leading-[0.9] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
                >
                  WHAT A TASTE.
                </h3>
                <p className="text-white/60 text-xs md:text-sm mt-2 max-w-md">
                  &ldquo;It was a successful pop-up and we are beyond grateful. Thank you so much!&rdquo;
                </p>
              </div>

              {/* mute toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const v = heroRef.current;
                  if (!v) return;
                  v.muted = !v.muted;
                  setMuted(v.muted);
                  if (!v.muted) v.play().catch(() => {});
                }}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mosaic grid of real reels + photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {TILES.map((tile, i) => (
            <Tile key={tile.src} tile={tile} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(125,206,160,0.18) 0%, rgba(80,160,120,0.18) 100%)",
              border: "1px solid rgba(125,206,160,0.35)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#7dcea0]">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Follow @bigwissmatcha</span>
          </a>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mt-3">
            121 followers &middot; 7 posts &middot; Dearborn, MI
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1.5%); }
        }
      `}</style>
    </section>
  );
}
