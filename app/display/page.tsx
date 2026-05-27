"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── MENU DATA ────────────────────────────────────────────────────────────────
const MENU = [
  {
    category: "SIGNATURE",
    accent: "#7dcea0",
    items: [
      { name: "Classic Matcha Latte",  desc: "Ceremonial grade · steamed milk",      price: "$7.00" },
      { name: "Iced Matcha Latte",     desc: "Shaken over ice · smooth finish",      price: "$7.00" },
      { name: "Matcha Oat Latte",      desc: "House oat milk blend · velvety",       price: "$7.50" },
      { name: "Matcha Americano",      desc: "Matcha & sparkling water · crisp",     price: "$6.50" },
      { name: "Ceremonial Hot Matcha", desc: "Pure ceremonial grade · traditional",  price: "$6.00" },
    ],
  },
  {
    category: "SPECIALTY",
    accent: "#c4f0d5",
    items: [
      { name: "Cream Top Matcha",   desc: "Sweet cream foam · velvety texture",    price: "$8.00" },
      { name: "Dirty Matcha",       desc: "Espresso shot · balanced energy",       price: "$8.50" },
      { name: "Strawberry Matcha",  desc: "Fresh strawberry purée · layered",      price: "$9.00" },
      { name: "Vanilla Matcha",     desc: "House vanilla · ceremonial grade",      price: "$8.50" },
      { name: "Brown Sugar Matcha", desc: "Caramelized brown sugar · rich blend",  price: "$8.50" },
    ],
  },
  {
    category: "SEASONAL",
    accent: "#f0d080",
    items: [
      { name: "Lavender Matcha",    desc: "Floral lavender · silky finish",        price: "$9.50" },
      { name: "Mango Matcha",       desc: "Tropical mango purée over ice",         price: "$9.00" },
      { name: "Honey Yuzu Matcha",  desc: "Citrus honey · ceremonial grade",       price: "$9.50" },
      { name: "Rose Matcha Latte",  desc: "Rose water · oat milk · delicate",      price: "$9.00" },
      { name: "Mint Chip Matcha",   desc: "Fresh mint · dark chocolate chips",     price: "$9.50" },
    ],
  },
  {
    category: "ADD-ONS",
    accent: "#C4A57B",
    items: [
      { name: "Extra Matcha Shot",  desc: "More depth, more energy",               price: "+$1.50" },
      { name: "Cream Top",          desc: "Sweet cream foam layer",                price: "+$1.50" },
      { name: "Oat Milk Upgrade",   desc: "Plant-based alternative",               price: "+$1.00" },
      { name: "Flavor Syrup",       desc: "Vanilla · brown sugar · lavender",      price: "+$0.75" },
      { name: "Large (24 oz)",      desc: "Regular → Large size upgrade",          price: "+$1.50" },
    ],
  },
];

// ── MARQUEE SLIDES ───────────────────────────────────────────────────────────
const CUP_SLIDES = [
  { src: "/product-cups/v3-classic.png",    label: "Classic Matcha",    sub: "Ceremonial Grade" },
  { src: "/product-cups/v3-cream.png",      label: "Cream Top Matcha",  sub: "Sweet Cream Foam" },
  { src: "/product-cups/v3-strawberry.png", label: "Strawberry Matcha", sub: "Fresh Purée" },
  { src: "/product-cups/v3-dirty.png",      label: "Dirty Matcha",      sub: "Espresso Blend" },
  { src: "/product-cups/v3-iced.png",       label: "Iced Matcha",       sub: "Shaken Over Ice" },
  { src: "/product-cups/v3-vanilla.png",    label: "Vanilla Matcha",    sub: "House Vanilla" },
];

// Text/brand cards that appear between cup images
const BRAND_CARDS = [
  { headline: "FOUNDER-LED",      sub: "Dearborn, MI",           accent: "#7dcea0" },
  { headline: "PREMIUM MATCHA",   sub: "Ceremonial Grade",       accent: "#c4f0d5" },
  { headline: "NOW BOOKING",      sub: "Summer 2026",            accent: "#C4A57B" },
  { headline: "EVENT CATERING",   sub: "Weddings · Activations", accent: "#7dcea0" },
  { headline: "BIG ENERGY.",      sub: "Real Matcha.",           accent: "#f0d080" },
];

// Interleave cup slides & brand cards for a richer marquee
function buildMarquee() {
  const slides: { type: "cup" | "card"; data: (typeof CUP_SLIDES)[0] | (typeof BRAND_CARDS)[0] }[] = [];
  const maxLen = Math.max(CUP_SLIDES.length, BRAND_CARDS.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < CUP_SLIDES.length)  slides.push({ type: "cup",  data: CUP_SLIDES[i] });
    if (i < BRAND_CARDS.length) slides.push({ type: "card", data: BRAND_CARDS[i] });
  }
  return slides;
}

const MARQUEE_SLIDES = buildMarquee();

// ── CLOCK ────────────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function DisplayPage() {
  return (
    <div
      className="flex flex-col"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(160deg, #081910 0%, #0d2218 40%, #0a1e14 100%)",
        fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        style={{
          height: "13vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 3vw",
          borderBottom: "1px solid rgba(125,206,160,0.15)",
          background: "rgba(0,0,0,0.18)",
          flexShrink: 0,
        }}
      >
        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.6vw" }}>
          <div style={{ position: "relative", width: "7.5vh", height: "7.5vh" }}>
            <Image src="/logo/logo-v2.png" alt="Big Wiss Matcha" fill style={{ objectFit: "contain" }} priority />
          </div>
          <div>
            <div
              style={{
                fontSize: "2.8vh",
                fontWeight: 800,
                letterSpacing: "0.04em",
                color: "#fff",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              Big Wiss Matcha
            </div>
            <div style={{ fontSize: "1.4vh", color: "#7dcea0", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "0.3vh" }}>
              Dearborn, MI · Premium Matcha
            </div>
          </div>
        </div>

        {/* Center badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8vw",
            background: "rgba(125,206,160,0.12)",
            border: "1px solid rgba(125,206,160,0.3)",
            borderRadius: "999px",
            padding: "0.9vh 2vw",
          }}
        >
          <span style={{ width: "0.8vh", height: "0.8vh", borderRadius: "50%", background: "#7dcea0", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
          <span style={{ fontSize: "1.5vh", fontWeight: 700, color: "#7dcea0", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Now Booking · Summer 2026
          </span>
        </div>

        {/* Clock */}
        <div style={{ fontSize: "2.4vh", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
          <LiveClock />
        </div>
      </header>

      {/* ── MENU BOARD ─────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {MENU.map((cat, ci) => (
          <div
            key={cat.category}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2.2vh 2vw",
              borderRight: ci < MENU.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              overflow: "hidden",
            }}
          >
            {/* Category header */}
            <div style={{ marginBottom: "1.6vh", flexShrink: 0 }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "1.1vh",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: cat.accent,
                  background: `${cat.accent}18`,
                  border: `1px solid ${cat.accent}40`,
                  borderRadius: "4px",
                  padding: "0.4vh 0.8vw",
                  marginBottom: "0.9vh",
                }}
              >
                {cat.category}
              </div>
              <div style={{ height: "1px", background: `linear-gradient(90deg, ${cat.accent}60, transparent)` }} />
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh", flex: 1 }}>
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "0.8vw",
                    padding: "1.1vh 1vw",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "1.75vh",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.2,
                        marginBottom: "0.35vh",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "1.2vh",
                        color: "rgba(255,255,255,0.38)",
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.8vh",
                      fontWeight: 700,
                      color: cat.accent,
                      flexShrink: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* ── AUTO-SCROLL MARQUEE ─────────────────────────────── */}
      <footer
        style={{
          height: "22vh",
          borderTop: "1px solid rgba(125,206,160,0.15)",
          background: "rgba(0,0,0,0.22)",
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", animation: "marquee 40s linear infinite", width: "max-content" }}>
          {[...MARQUEE_SLIDES, ...MARQUEE_SLIDES].map((slide, i) => (
            <div
              key={i}
              style={{
                width: "18vh",
                height: "19vh",
                flexShrink: 0,
                marginRight: "2vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {slide.type === "cup" ? (
                <>
                  <div style={{ position: "relative", width: "10vh", height: "14vh" }}>
                    <Image
                      src={(slide.data as typeof CUP_SLIDES[0]).src}
                      alt={(slide.data as typeof CUP_SLIDES[0]).label}
                      fill
                      style={{ objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))" }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "0.6vh" }}>
                    <div style={{ fontSize: "1.2vh", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
                      {(slide.data as typeof CUP_SLIDES[0]).label}
                    </div>
                    <div style={{ fontSize: "1vh", color: "rgba(125,206,160,0.7)", letterSpacing: "0.08em" }}>
                      {(slide.data as typeof CUP_SLIDES[0]).sub}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    width: "15vh",
                    height: "15vh",
                    borderRadius: "12px",
                    border: `1px solid ${(slide.data as typeof BRAND_CARDS[0]).accent}40`,
                    background: `${(slide.data as typeof BRAND_CARDS[0]).accent}0e`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "1vh",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5vh",
                      fontWeight: 800,
                      color: (slide.data as typeof BRAND_CARDS[0]).accent,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    {(slide.data as typeof BRAND_CARDS[0]).headline}
                  </div>
                  <div style={{ width: "40%", height: "1px", background: `${(slide.data as typeof BRAND_CARDS[0]).accent}50`, margin: "0.6vh auto" }} />
                  <div style={{ fontSize: "1.1vh", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {(slide.data as typeof BRAND_CARDS[0]).sub}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
