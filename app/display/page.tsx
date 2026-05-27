"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const CREAM        = "#f5f0e4";
const CREAM_MID    = "rgba(245,240,228,0.65)";
const CREAM_LOW    = "rgba(245,240,228,0.42)";
const CREAM_GHOST  = "rgba(245,240,228,0.07)";
const GLASS        = "rgba(8,20,12,0.76)";
const GLASS_BORDER = "rgba(245,240,228,0.10)";

// ── MENU DATA ────────────────────────────────────────────────────────────────
const MENU = [
  {
    category: "Signature",
    accent: "#7ecba4",
    items: [
      { name: "Classic Matcha Latte",  desc: "Ceremonial grade · steamed milk",      price: "$7.00" },
      { name: "Iced Matcha Latte",     desc: "Shaken over ice · smooth finish",      price: "$7.00" },
      { name: "Matcha Oat Latte",      desc: "House oat milk blend · velvety",       price: "$7.50" },
      { name: "Matcha Americano",      desc: "Matcha & sparkling water · crisp",     price: "$6.50" },
      { name: "Ceremonial Hot Matcha", desc: "Pure ceremonial grade · traditional",  price: "$6.00" },
    ],
  },
  {
    category: "Specialty",
    accent: "#a8dbbe",
    items: [
      { name: "Cream Top Matcha",   desc: "Sweet cream foam · velvety texture",   price: "$8.00" },
      { name: "Dirty Matcha",       desc: "Espresso shot · balanced energy",      price: "$8.50" },
      { name: "Strawberry Matcha",  desc: "Fresh strawberry purée · layered",     price: "$9.00" },
      { name: "Vanilla Matcha",     desc: "House vanilla · ceremonial grade",     price: "$8.50" },
      { name: "Brown Sugar Matcha", desc: "Caramelised brown sugar · rich",       price: "$8.50" },
    ],
  },
  {
    category: "Seasonal",
    accent: "#cfa55a",
    items: [
      { name: "Lavender Matcha",    desc: "Floral lavender · silky finish",       price: "$9.50" },
      { name: "Mango Matcha",       desc: "Tropical mango purée over ice",        price: "$9.00" },
      { name: "Honey Yuzu Matcha",  desc: "Citrus honey · ceremonial grade",      price: "$9.50" },
      { name: "Rose Matcha Latte",  desc: "Rose water · oat milk · delicate",     price: "$9.00" },
      { name: "Mint Chip Matcha",   desc: "Fresh mint · dark chocolate chips",    price: "$9.50" },
    ],
  },
  {
    category: "Add-Ons",
    accent: "#c4a07a",
    items: [
      { name: "Extra Matcha Shot",  desc: "More depth, more energy",              price: "+$1.50" },
      { name: "Cream Top",          desc: "Sweet cream foam layer",               price: "+$1.50" },
      { name: "Oat Milk Upgrade",   desc: "Plant-based alternative",              price: "+$1.00" },
      { name: "Flavour Syrup",      desc: "Vanilla · brown sugar · lavender",     price: "+$0.75" },
      { name: "Large (24 oz)",      desc: "Regular → Large size upgrade",         price: "+$1.50" },
    ],
  },
];

const FLAT_ITEMS = MENU.flatMap((cat, ci) =>
  cat.items.map((_item, ii) => ({ ci, ii }))
);

// ── MARQUEE DATA ─────────────────────────────────────────────────────────────
const CUP_SLIDES = [
  { src: "/product-cups/v3-classic.png",    label: "Classic Matcha",    sub: "Ceremonial Grade" },
  { src: "/product-cups/v3-cream.png",      label: "Cream Top Matcha",  sub: "Sweet Cream Foam" },
  { src: "/product-cups/v3-strawberry.png", label: "Strawberry Matcha", sub: "Fresh Purée"      },
  { src: "/product-cups/v3-dirty.png",      label: "Dirty Matcha",      sub: "Espresso Blend"   },
  { src: "/product-cups/v3-iced.png",       label: "Iced Matcha",       sub: "Shaken Over Ice"  },
  { src: "/product-cups/v3-vanilla.png",    label: "Vanilla Matcha",    sub: "House Vanilla"    },
];

const BRAND_CARDS = [
  { headline: "Founder-Led",    sub: "Dearborn, MI",           accent: "#7ecba4" },
  { headline: "Premium Matcha", sub: "Ceremonial Grade",       accent: "#a8dbbe" },
  { headline: "Now Booking",    sub: "Summer 2026",            accent: "#cfa55a" },
  { headline: "Event Catering", sub: "Weddings · Activations", accent: "#7ecba4" },
  { headline: "Big Energy.",    sub: "Real Matcha.",           accent: "#c4a07a" },
];

function buildMarquee() {
  const slides: { type: "cup" | "card"; data: typeof CUP_SLIDES[0] | typeof BRAND_CARDS[0] }[] = [];
  const max = Math.max(CUP_SLIDES.length, BRAND_CARDS.length);
  for (let i = 0; i < max; i++) {
    if (i < CUP_SLIDES.length)  slides.push({ type: "cup",  data: CUP_SLIDES[i] });
    if (i < BRAND_CARDS.length) slides.push({ type: "card", data: BRAND_CARDS[i] });
  }
  return slides;
}
const MARQUEE_SLIDES = buildMarquee();

// ── FLOATING MATCHA PARTICLES ─────────────────────────────────────────────────
const PARTICLES = [
  { x: 12,  y: 18, r: 3,   op: 0.35, d: 20, delay: 0   },
  { x: 28,  y: 72, r: 2,   op: 0.25, d: 26, delay: 4   },
  { x: 48,  y: 12, r: 4,   op: 0.30, d: 18, delay: 8   },
  { x: 67,  y: 44, r: 2.5, op: 0.20, d: 24, delay: 2   },
  { x: 82,  y: 22, r: 3,   op: 0.28, d: 22, delay: 10  },
  { x: 38,  y: 58, r: 2,   op: 0.22, d: 30, delay: 6   },
  { x: 74,  y: 78, r: 3.5, op: 0.25, d: 28, delay: 14  },
  { x: 55,  y: 88, r: 2,   op: 0.18, d: 19, delay: 3   },
  { x: 92,  y: 60, r: 3,   op: 0.30, d: 23, delay: 9   },
  { x: 18,  y: 88, r: 2.5, op: 0.22, d: 25, delay: 7   },
  { x: 62,  y: 30, r: 4,   op: 0.28, d: 21, delay: 12  },
  { x: 85,  y: 90, r: 2,   op: 0.20, d: 32, delay: 5   },
  { x: 42,  y: 38, r: 3,   op: 0.26, d: 17, delay: 11  },
  { x: 8,   y: 52, r: 2,   op: 0.18, d: 29, delay: 16  },
  { x: 96,  y: 38, r: 2.5, op: 0.24, d: 20, delay: 1   },
];

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
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif",
        // ── THE BACKGROUND: cream pouring into deep matcha ──
        background:
          // Cream bloom — the pour point, bright & warm
          "radial-gradient(ellipse 58% 65% at 22% 24%, #f7f3e2 0%, #e0ecd8 18%, #aaceb0 34%, #5fa876 50%, transparent 66%), " +
          // Secondary swirl — smaller bloom, lower-right
          "radial-gradient(ellipse 40% 42% at 78% 74%, rgba(240,236,208,0.60) 0%, rgba(140,198,152,0.38) 30%, transparent 54%), " +
          // Rich deep matcha base
          "linear-gradient(148deg, #1d5235 0%, #0d2c1a 36%, #163828 65%, #0b1e10 100%)",
      }}
    >
      {/* ── MATCHA POWDER SPECKLE LAYER ────────────────── */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(52,128,68,0.22) 1px, transparent 1px), " +
            "radial-gradient(circle, rgba(38,105,54,0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "42px 42px, 68px 68px",
          backgroundPosition: "0 0, 21px 26px",
          pointerEvents: "none",
        }}
      />

      {/* ── FLOATING MATCHA PARTICLES ───────────────────── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.r * 2}px`,
              height: `${p.r * 2}px`,
              borderRadius: "50%",
              background: `rgba(55,138,72,${p.op})`,
              filter: "blur(0.8px)",
              animation: `particleFloat ${p.d}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── CREAM BLOOM BREATHING ANIMATION ─────────────── */}
      {/* Layer 1: primary bloom pulses in */}
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 52% 58% at 22% 24%, rgba(247,243,226,0.18) 0%, transparent 55%)",
          animation: "creamBreathe1 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      {/* Layer 2: secondary bloom pulses offset */}
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 36% 38% at 78% 74%, rgba(240,234,205,0.14) 0%, transparent 52%)",
          animation: "creamBreathe2 11s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── LAYOUT ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", height: "100vh",
        }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <header
          style={{
            height: "12.5vh",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 3.5vw",
            background: GLASS,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: `1px solid ${GLASS_BORDER}`,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Cream shimmer line on header bottom */}
          <div
            style={{
              position: "absolute", bottom: 0, left: "12%", right: "12%", height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(245,240,228,0.30), rgba(167,215,186,0.50), rgba(245,240,228,0.30), transparent)",
              animation: "shimmerLine 6s ease-in-out infinite",
            }}
          />

          {/* Logo + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.8vw" }}>
            <div style={{ position: "relative", width: "9vh", height: "9vh" }}>
              <Image
                src="/logo/logo-v2.png"
                alt="Big Wiss Matcha"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "4vh",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: CREAM,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                Big Wiss Matcha
              </div>
              <div
                style={{
                  fontSize: "1.15vh",
                  fontWeight: 300,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: CREAM_LOW,
                  marginTop: "0.55vh",
                }}
              >
                Dearborn, Michigan
              </div>
            </div>
          </div>

          {/* Centre — clean, no pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5vw",
              borderLeft: `1px solid ${GLASS_BORDER}`,
              borderRight: `1px solid ${GLASS_BORDER}`,
              padding: "0 3vw",
            }}
          >
            <span
              style={{
                width: "0.5vh", height: "0.5vh", borderRadius: "50%",
                background: "#7ecba4",
                display: "inline-block",
                animation: "dotBreathe 3.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "1.3vh",
                fontWeight: 300,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: CREAM_MID,
              }}
            >
              Now Booking · Summer 2026
            </span>
            <span
              style={{
                width: "0.5vh", height: "0.5vh", borderRadius: "50%",
                background: "#7ecba4",
                display: "inline-block",
                animation: "dotBreathe 3.5s ease-in-out 1.75s infinite",
              }}
            />
          </div>

          {/* Clock */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "3.5vh",
              fontWeight: 400,
              color: "rgba(245,240,228,0.62)",
              letterSpacing: "0.06em",
            }}
          >
            <LiveClock />
          </div>
        </header>

        {/* ── MENU BOARD — 4 glass panels ─────────────────── */}
        <main
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 1.2vw",
            padding: "1.6vh 2vw",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {MENU.map((cat, ci) => (
            <div
              key={cat.category}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderRadius: "14px",
                background: GLASS,
                border: `1px solid ${GLASS_BORDER}`,
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                overflow: "hidden",
                animation: `panelRise 0.9s ease ${ci * 0.12}s both`,
              }}
            >
              {/* Glass top sheen */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: "35%",
                  background:
                    "linear-gradient(180deg, rgba(245,240,228,0.055) 0%, transparent 100%)",
                  borderRadius: "14px 14px 0 0",
                  pointerEvents: "none",
                }}
              />

              {/* Top accent strip */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: "20%", right: "20%",
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${cat.accent}90, transparent)`,
                }}
              />

              {/* Content */}
              <div style={{ padding: "2.2vh 1.8vw", display: "flex", flexDirection: "column", flex: 1 }}>

                {/* Category label */}
                <div style={{ marginBottom: "1.6vh", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: "1.1vh",
                      fontWeight: 600,
                      letterSpacing: "0.46em",
                      textTransform: "uppercase",
                      color: cat.accent,
                      marginBottom: "1.2vh",
                    }}
                  >
                    {cat.category}
                  </div>
                  <div
                    style={{
                      height: "1px",
                      background: `linear-gradient(90deg, ${cat.accent}80, ${cat.accent}18, transparent)`,
                    }}
                  />
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {cat.items.map((item, ii) => {
                    const flatIdx = ci * 5 + ii;
                    const isSpotlit =
                      FLAT_ITEMS[spotlight].ci === ci &&
                      FLAT_ITEMS[spotlight].ii === ii;

                    return (
                      <div key={item.name}>
                        {/* Hairline separator (not before first item) */}
                        {ii > 0 && (
                          <div
                            style={{
                              height: "1px",
                              background: CREAM_GHOST,
                              margin: "0 -1.8vw",
                            }}
                          />
                        )}

                        {/* Item row */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1vw",
                            padding: "1.05vh 0",
                            paddingLeft: "0.6vw",
                            // Spotlight: inset left bar
                            boxShadow: isSpotlit
                              ? `inset 3px 0 0 ${cat.accent}`
                              : "inset 3px 0 0 transparent",
                            background: isSpotlit
                              ? "rgba(245,240,228,0.055)"
                              : "transparent",
                            transition:
                              "box-shadow 1s ease, background 1s ease",
                            animation: `itemRise 0.9s ease ${flatIdx * 0.08 + 0.3}s both`,
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: "2.3vh",
                                fontWeight: isSpotlit ? 500 : 400,
                                color: isSpotlit ? CREAM : "rgba(245,240,228,0.88)",
                                lineHeight: 1.2,
                                marginBottom: "0.2vh",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                transition: "color 1s ease",
                              }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{
                                fontSize: "1.18vh",
                                fontWeight: 300,
                                letterSpacing: "0.04em",
                                color: CREAM_LOW,
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
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontSize: "2.15vh",
                              fontWeight: 500,
                              color: isSpotlit ? cat.accent : `${cat.accent}cc`,
                              flexShrink: 0,
                              letterSpacing: "0.02em",
                              transition: "color 1s ease",
                            }}
                          >
                            {item.price}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <footer
          style={{
            height: "19vh",
            background: GLASS,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: `1px solid ${GLASS_BORDER}`,
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 9%, black 91%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 9%, black 91%, transparent 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              animation: "marquee 44s linear infinite",
              width: "max-content",
            }}
          >
            {[...MARQUEE_SLIDES, ...MARQUEE_SLIDES].map((slide, i) => (
              <div
                key={i}
                style={{
                  width: "21vh",
                  height: "17.5vh",
                  flexShrink: 0,
                  marginRight: "3vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {slide.type === "cup" ? (
                  <>
                    <div style={{ position: "relative", width: "11vh", height: "13.5vh" }}>
                      <Image
                        src={(slide.data as typeof CUP_SLIDES[0]).src}
                        alt={(slide.data as typeof CUP_SLIDES[0]).label}
                        fill
                        style={{
                          objectFit: "contain",
                          filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.75))",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "0.7vh" }}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.6vh",
                          fontWeight: 400,
                          color: CREAM,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {(slide.data as typeof CUP_SLIDES[0]).label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.95vh",
                          fontWeight: 300,
                          color: CREAM_LOW,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          marginTop: "0.2vh",
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
                      height: "14vh",
                      borderRadius: "10px",
                      border: `1px solid ${(slide.data as typeof BRAND_CARDS[0]).accent}35`,
                      background: `${(slide.data as typeof BRAND_CARDS[0]).accent}0d`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "1.1vh",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "2vh",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: (slide.data as typeof BRAND_CARDS[0]).accent,
                        letterSpacing: "0.02em",
                        lineHeight: 1.2,
                      }}
                    >
                      {(slide.data as typeof BRAND_CARDS[0]).headline}
                    </div>
                    <div
                      style={{
                        width: "28%",
                        height: "1px",
                        background: `${(slide.data as typeof BRAND_CARDS[0]).accent}55`,
                        margin: "0.65vh auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.9vh",
                        fontWeight: 300,
                        color: CREAM_LOW,
                        letterSpacing: "0.18em",
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,300;1,400;1,500&display=swap');

        /* Cream bloom breathe — layer 1 */
        @keyframes creamBreathe1 {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.04); }
        }

        /* Cream bloom breathe — layer 2, offset */
        @keyframes creamBreathe2 {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.06); }
        }

        /* Floating matcha particles */
        @keyframes particleFloat {
          0%,  100% { transform: translate(0, 0)    scale(1);    opacity: var(--op, 0.3); }
          25%        { transform: translate(10px,-14px) scale(1.25); opacity: calc(var(--op, 0.3) + 0.12); }
          55%        { transform: translate(-6px,-22px) scale(0.8);  opacity: calc(var(--op, 0.3) - 0.08); }
          78%        { transform: translate(14px,-9px)  scale(1.15); opacity: calc(var(--op, 0.3) + 0.08); }
        }

        /* Glass panel entrance */
        @keyframes panelRise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Item row entrance */
        @keyframes itemRise {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Marquee */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Breathing accent dots */
        @keyframes dotBreathe {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.55); }
        }

        /* Header bottom shimmer sweep */
        @keyframes shimmerLine {
          0%,  100% { opacity: 0.6; background-position: 0% 0; }
          50%        { opacity: 1;   background-position: 100% 0; }
        }
      `}</style>
    </div>
  );
}
