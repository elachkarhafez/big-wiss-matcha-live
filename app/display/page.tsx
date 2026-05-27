"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

// Flat index map for spotlight cycling
const FLAT_ITEMS = MENU.flatMap((cat, ci) =>
  cat.items.map((_item, ii) => ({ ci, ii }))
);

// ── MARQUEE SLIDES ───────────────────────────────────────────────────────────
const CUP_SLIDES = [
  { src: "/product-cups/v3-classic.png",    label: "Classic Matcha",    sub: "Ceremonial Grade" },
  { src: "/product-cups/v3-cream.png",      label: "Cream Top Matcha",  sub: "Sweet Cream Foam" },
  { src: "/product-cups/v3-strawberry.png", label: "Strawberry Matcha", sub: "Fresh Purée" },
  { src: "/product-cups/v3-dirty.png",      label: "Dirty Matcha",      sub: "Espresso Blend" },
  { src: "/product-cups/v3-iced.png",       label: "Iced Matcha",       sub: "Shaken Over Ice" },
  { src: "/product-cups/v3-vanilla.png",    label: "Vanilla Matcha",    sub: "House Vanilla" },
];

const BRAND_CARDS = [
  { headline: "FOUNDER-LED",      sub: "Dearborn, MI",           accent: "#7dcea0" },
  { headline: "PREMIUM MATCHA",   sub: "Ceremonial Grade",       accent: "#c4f0d5" },
  { headline: "NOW BOOKING",      sub: "Summer 2026",            accent: "#C4A57B" },
  { headline: "EVENT CATERING",   sub: "Weddings · Activations", accent: "#7dcea0" },
  { headline: "BIG ENERGY.",      sub: "Real Matcha.",           accent: "#f0d080" },
];

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
  const [spotlight, setSpotlight] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSpotlight((p) => (p + 1) % FLAT_ITEMS.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        // Brighter, more saturated dark-green base
        background: "linear-gradient(145deg, #0d3020 0%, #124030 45%, #0f3525 100%)",
        fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
        position: "relative",
      }}
    >
      {/* ── BACKGROUND AMBIANCE ──────────────────────────── */}
      <div
        style={{
          position: "absolute", inset: 0, overflow: "hidden",
          pointerEvents: "none", zIndex: 0,
        }}
      >
        {/* Large glowing orbs that slowly drift */}
        <div style={{
          position: "absolute", top: "-20%", left: "5%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(125,206,160,0.20) 0%, transparent 60%)",
          animation: "drift1 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "0%",
          width: "45vw", height: "45vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,240,213,0.13) 0%, transparent 60%)",
          animation: "drift2 26s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "-8%",
          width: "30vw", height: "30vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,208,128,0.10) 0%, transparent 60%)",
          animation: "drift3 32s ease-in-out infinite",
        }} />

        {/* Subtle dot grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(125,206,160,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* Moving scan line — TV authenticity */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(125,206,160,0.25) 50%, transparent 100%)",
          animation: "scan 10s linear infinite",
        }} />
      </div>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", height: "100vh",
        }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <header
          style={{
            height: "13vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 3vw",
            borderBottom: "1px solid rgba(125,206,160,0.3)",
            background: "linear-gradient(90deg, rgba(18,64,48,0.75), rgba(14,48,36,0.55))",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Glowing bottom rule */}
          <div style={{
            position: "absolute", bottom: -1, left: "8%", right: "8%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(125,206,160,0.7), transparent)",
            filter: "blur(1px)",
          }} />

          {/* Logo + brand name */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.6vw" }}>
            <div style={{ position: "relative", width: "9vh", height: "9vh" }}>
              <Image
                src="/logo/logo-v2.png"
                alt="Big Wiss Matcha"
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 14px rgba(125,206,160,0.45))",
                }}
                priority
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "3.6vh",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  textShadow: "0 0 28px rgba(125,206,160,0.5)",
                }}
              >
                Big Wiss Matcha
              </div>
              <div
                style={{
                  fontSize: "1.55vh",
                  color: "#8dd9ad",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginTop: "0.35vh",
                }}
              >
                Dearborn, MI · Premium Matcha
              </div>
            </div>
          </div>

          {/* Center booking badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.9vw",
              background: "rgba(125,206,160,0.16)",
              border: "1px solid rgba(125,206,160,0.55)",
              borderRadius: "999px",
              padding: "1.1vh 2.6vw",
              boxShadow: "0 0 28px rgba(125,206,160,0.22), inset 0 1px 0 rgba(125,206,160,0.25)",
              animation: "badgeBreath 4s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: "0.9vh", height: "0.9vh", borderRadius: "50%",
                background: "#7dcea0",
                animation: "pulse 2s ease-in-out infinite",
                display: "inline-block",
                boxShadow: "0 0 10px #7dcea0",
              }}
            />
            <span
              style={{
                fontSize: "1.8vh",
                fontWeight: 700,
                color: "#a8e6c0",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Now Booking · Summer 2026
            </span>
          </div>

          {/* Live clock */}
          <div
            style={{
              fontSize: "3vh",
              fontWeight: 700,
              color: "rgba(255,255,255,0.78)",
              letterSpacing: "0.08em",
              textShadow: "0 0 18px rgba(125,206,160,0.35)",
            }}
          >
            <LiveClock />
          </div>
        </header>

        {/* ── MENU BOARD ─────────────────────────────────── */}
        <main
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
                padding: "2vh 1.8vw",
                borderRight: ci < MENU.length - 1
                  ? "1px solid rgba(255,255,255,0.09)"
                  : "none",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Per-column top glow */}
              <div
                style={{
                  position: "absolute", top: 0, left: "12%", right: "12%", height: "1px",
                  background: `linear-gradient(90deg, transparent, ${cat.accent}95, transparent)`,
                  boxShadow: `0 0 16px ${cat.accent}70`,
                }}
              />

              {/* Category badge */}
              <div style={{ marginBottom: "1.5vh", flexShrink: 0 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "1.4vh",
                    fontWeight: 800,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: cat.accent,
                    background: `${cat.accent}20`,
                    border: `1px solid ${cat.accent}55`,
                    borderRadius: "5px",
                    padding: "0.55vh 1vw",
                    marginBottom: "0.9vh",
                    boxShadow: `0 0 16px ${cat.accent}22`,
                    textShadow: `0 0 12px ${cat.accent}90`,
                  }}
                >
                  {cat.category}
                </div>
                <div
                  style={{
                    height: "1px",
                    background: `linear-gradient(90deg, ${cat.accent}90, ${cat.accent}30, transparent)`,
                    boxShadow: `0 0 6px ${cat.accent}50`,
                  }}
                />
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85vh", flex: 1 }}>
                {cat.items.map((item, ii) => {
                  const flatIdx = ci * 5 + ii;
                  const isSpotlit =
                    FLAT_ITEMS[spotlight].ci === ci &&
                    FLAT_ITEMS[spotlight].ii === ii;
                  const entranceDelay = flatIdx * 0.09;

                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.8vw",
                        padding: "1.2vh 1vw",
                        borderRadius: "8px",
                        background: isSpotlit
                          ? `${cat.accent}1c`
                          : "rgba(255,255,255,0.06)",
                        border: `1px solid ${
                          isSpotlit
                            ? `${cat.accent}70`
                            : "rgba(255,255,255,0.09)"
                        }`,
                        boxShadow: isSpotlit
                          ? `0 0 28px ${cat.accent}30, inset 0 0 16px ${cat.accent}0c`
                          : "none",
                        transition:
                          "background 0.55s ease, border-color 0.55s ease, box-shadow 0.55s ease",
                        // Entrance animation
                        opacity: 0,
                        animation: `slideIn 0.55s ease ${entranceDelay}s forwards`,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "2.1vh",
                            fontWeight: 700,
                            color: isSpotlit ? cat.accent : "#fff",
                            lineHeight: 1.2,
                            marginBottom: "0.3vh",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "color 0.55s ease, text-shadow 0.55s ease",
                            textShadow: isSpotlit
                              ? `0 0 20px ${cat.accent}95`
                              : "none",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: "1.4vh",
                            color: "rgba(255,255,255,0.65)",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>

                      {/* Price */}
                      <div
                        style={{
                          fontSize: "2.2vh",
                          fontWeight: 800,
                          color: cat.accent,
                          flexShrink: 0,
                          letterSpacing: "0.02em",
                          animation: `priceGlow 3.5s ease-in-out ${flatIdx * 0.22}s infinite`,
                        }}
                      >
                        {item.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </main>

        {/* ── AUTO-SCROLL MARQUEE ─────────────────────────── */}
        <footer
          style={{
            height: "20vh",
            borderTop: "1px solid rgba(125,206,160,0.25)",
            background: "rgba(0,0,0,0.3)",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Edge fade masks */}
          <div
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "10vw",
              background: "linear-gradient(90deg, #0d3020 0%, transparent 100%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "10vw",
              background: "linear-gradient(-90deg, #0d3020 0%, transparent 100%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              animation: "marquee 36s linear infinite",
              width: "max-content",
            }}
          >
            {[...MARQUEE_SLIDES, ...MARQUEE_SLIDES].map((slide, i) => (
              <div
                key={i}
                style={{
                  width: "20vh",
                  height: "18vh",
                  flexShrink: 0,
                  marginRight: "2.5vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {slide.type === "cup" ? (
                  <>
                    <div style={{ position: "relative", width: "11vh", height: "14vh" }}>
                      <Image
                        src={(slide.data as typeof CUP_SLIDES[0]).src}
                        alt={(slide.data as typeof CUP_SLIDES[0]).label}
                        fill
                        style={{
                          objectFit: "contain",
                          filter:
                            "drop-shadow(0 4px 22px rgba(0,0,0,0.75)) drop-shadow(0 0 10px rgba(125,206,160,0.22))",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "0.6vh" }}>
                      <div
                        style={{
                          fontSize: "1.4vh",
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {(slide.data as typeof CUP_SLIDES[0]).label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.1vh",
                          color: "rgba(125,206,160,0.88)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {(slide.data as typeof CUP_SLIDES[0]).sub}
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      width: "16vh",
                      height: "15vh",
                      borderRadius: "12px",
                      border: `1px solid ${(slide.data as typeof BRAND_CARDS[0]).accent}55`,
                      background: `${(slide.data as typeof BRAND_CARDS[0]).accent}14`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "1.2vh",
                      boxShadow: `0 0 22px ${(slide.data as typeof BRAND_CARDS[0]).accent}22`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.8vh",
                        fontWeight: 800,
                        color: (slide.data as typeof BRAND_CARDS[0]).accent,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                        textShadow: `0 0 14px ${(slide.data as typeof BRAND_CARDS[0]).accent}90`,
                      }}
                    >
                      {(slide.data as typeof BRAND_CARDS[0]).headline}
                    </div>
                    <div
                      style={{
                        width: "40%", height: "1px",
                        background: `${(slide.data as typeof BRAND_CARDS[0]).accent}65`,
                        margin: "0.7vh auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "1.25vh",
                        color: "rgba(255,255,255,0.72)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {(slide.data as typeof BRAND_CARDS[0]).sub}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </footer>
      </div>

      {/* ── KEYFRAMES ───────────────────────────────────── */}
      <style>{`
        /* Background orb drift */
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(4%, 3%) scale(1.06); }
          66%       { transform: translate(-2%, 5%) scale(0.96); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-5%, -3%) scale(1.08); }
          70%       { transform: translate(3%, -2%) scale(0.94); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30%       { transform: translate(6%, 2%) scale(1.07); }
          60%       { transform: translate(2%, -4%) scale(0.97); }
        }

        /* Scan line sweep */
        @keyframes scan {
          0%   { transform: translateY(-4px); opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 0.55; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        /* Marquee scroll */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Dot pulse in booking badge */
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.75); }
        }

        /* Badge outer glow breath */
        @keyframes badgeBreath {
          0%, 100% { box-shadow: 0 0 28px rgba(125,206,160,0.22), inset 0 1px 0 rgba(125,206,160,0.25); }
          50%       { box-shadow: 0 0 44px rgba(125,206,160,0.40), inset 0 1px 0 rgba(125,206,160,0.25); }
        }

        /* Price glow pulse (uses currentColor = cat.accent) */
        @keyframes priceGlow {
          0%, 100% { text-shadow: 0 0 10px currentColor; }
          50%       { text-shadow: 0 0 26px currentColor, 0 0 8px currentColor; }
        }

        /* Menu item entrance — slides up from below */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
