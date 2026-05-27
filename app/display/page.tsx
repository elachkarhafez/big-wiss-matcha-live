"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const CREAM       = "#f5f0e4";
const CREAM_MID   = "rgba(245,240,228,0.65)";
const CREAM_LOW   = "rgba(245,240,228,0.42)";
const CREAM_GHOST = "rgba(245,240,228,0.09)";
const GLASS       = "rgba(9,21,12,0.88)";
const GLASS_BDR   = "rgba(245,240,228,0.11)";

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
    accent: "#a8dbc0",
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
    accent: "#d4a84e",
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
  { headline: "Premium Matcha", sub: "Ceremonial Grade",       accent: "#a8dbc0" },
  { headline: "Now Booking",    sub: "Summer 2026",            accent: "#d4a84e" },
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

// ── FLOATING MATCHA DUST ─────────────────────────────────────────────────────
const DUST = [
  { x: 7,  y: 14, r: 1.5, op: 0.18, d: 24, delay: 0   },
  { x: 22, y: 72, r: 1,   op: 0.13, d: 30, delay: 5   },
  { x: 53, y: 9,  r: 2,   op: 0.16, d: 20, delay: 8   },
  { x: 77, y: 38, r: 1.2, op: 0.14, d: 26, delay: 3   },
  { x: 88, y: 78, r: 1.5, op: 0.16, d: 22, delay: 11  },
  { x: 38, y: 58, r: 1,   op: 0.11, d: 28, delay: 7   },
  { x: 63, y: 86, r: 1.8, op: 0.14, d: 25, delay: 14  },
  { x: 15, y: 44, r: 1.2, op: 0.12, d: 32, delay: 2   },
  { x: 92, y: 22, r: 1,   op: 0.13, d: 19, delay: 9   },
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
      }}
    >
      {/* ══════════════════════════════════════════════════
          MARBLE BACKGROUND
          Calacatta Verde: cream base + warped dark-green veins
          ══════════════════════════════════════════════════ */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {/* Turbulence displacement — makes straight gradient stripes flow organically */}
          <filter id="marble-warp" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0038 0.0065"
              numOctaves="5"
              seed="12"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="72"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Vein stripe gradient — diagonal 135° (upper-right → lower-left) matching the image */}
          <linearGradient id="veins" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            {/* TRANSPARENT cream between veins */}
            <stop offset="0%"    stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="9.5%"  stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein A — thin hairline */}
            <stop offset="9.7%"  stopColor="#253c22" stopOpacity="0.20"/>
            <stop offset="9.9%"  stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="21.5%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein B — main bold vein */}
            <stop offset="21.8%" stopColor="#1c3018" stopOpacity="0.38"/>
            <stop offset="22.2%" stopColor="#243e20" stopOpacity="0.28"/>
            <stop offset="22.6%" stopColor="#1c3018" stopOpacity="0.18"/>
            <stop offset="22.9%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="31.5%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein C — secondary branch */}
            <stop offset="31.7%" stopColor="#253c22" stopOpacity="0.16"/>
            <stop offset="32.0%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="43.0%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein D — bold vein 2 */}
            <stop offset="43.3%" stopColor="#1c3018" stopOpacity="0.34"/>
            <stop offset="43.8%" stopColor="#243e20" stopOpacity="0.22"/>
            <stop offset="44.2%" stopColor="#1c3018" stopOpacity="0.14"/>
            <stop offset="44.6%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="52.5%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein E — delicate thin */}
            <stop offset="52.7%" stopColor="#253c22" stopOpacity="0.14"/>
            <stop offset="53.0%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="63.5%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein F — medium vein */}
            <stop offset="63.8%" stopColor="#1c3018" stopOpacity="0.24"/>
            <stop offset="64.3%" stopColor="#243e20" stopOpacity="0.15"/>
            <stop offset="64.7%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="75.0%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein G — thin */}
            <stop offset="75.2%" stopColor="#253c22" stopOpacity="0.16"/>
            <stop offset="75.5%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="86.5%" stopColor="#f2ece0" stopOpacity="1"/>
            {/* Vein H — near edge */}
            <stop offset="86.8%" stopColor="#1c3018" stopOpacity="0.20"/>
            <stop offset="87.1%" stopColor="#f2ece0" stopOpacity="1"/>
            <stop offset="100%"  stopColor="#f2ece0" stopOpacity="1"/>
          </linearGradient>

          {/* Warm beige "cloud" patches — the calcium deposits in real marble */}
          <radialGradient id="warm1" cx="56%" cy="36%" r="22%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#c8b285" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#c8b285" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="warm2" cx="22%" cy="72%" r="16%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#c2aa7e" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="#c2aa7e" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="warm3" cx="82%" cy="18%" r="18%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#c8b285" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#c8b285" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="warm4" cx="70%" cy="82%" r="14%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#bfa878" stopOpacity="0.13"/>
            <stop offset="100%" stopColor="#bfa878" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Cream base */}
        <rect width="100%" height="100%" fill="#f3ede1"/>

        {/* Warm patches — unwarped (laid flat, like natural stone tonality) */}
        <rect width="100%" height="100%" fill="url(#warm1)"/>
        <rect width="100%" height="100%" fill="url(#warm2)"/>
        <rect width="100%" height="100%" fill="url(#warm3)"/>
        <rect width="100%" height="100%" fill="url(#warm4)"/>

        {/* Marble veins — the gradient warped by displacement */}
        <rect width="100%" height="100%" fill="url(#veins)" filter="url(#marble-warp)"/>
      </svg>

      {/* Subtle dark vignette at screen edges — keeps focus on content */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 82% 80% at 50% 50%, transparent 42%, rgba(18,30,20,0.26) 100%)",
        }}
      />

      {/* Floating matcha dust particles */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        {DUST.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.r * 2}px`,
              height: `${p.r * 2}px`,
              borderRadius: "50%",
              background: `rgba(32,58,28,${p.op})`,
              filter: "blur(0.6px)",
              animation: `dustDrift ${p.d}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          CONTENT — dark glass panels floating over marble
          ══════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative", zIndex: 10,
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
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: `1px solid ${GLASS_BDR}`,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Faint cream line shimmer */}
          <div
            style={{
              position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(245,240,228,0.28), rgba(168,219,192,0.45), rgba(245,240,228,0.28), transparent)",
            }}
          />

          {/* Logo + brand name */}
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
                  fontSize: "4.1vh",
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
                  fontSize: "1.1vh",
                  fontWeight: 300,
                  letterSpacing: "0.44em",
                  textTransform: "uppercase",
                  color: CREAM_LOW,
                  marginTop: "0.55vh",
                }}
              >
                Dearborn, Michigan
              </div>
            </div>
          </div>

          {/* Centre booking */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "1.4vw",
              borderLeft: `1px solid ${GLASS_BDR}`,
              borderRight: `1px solid ${GLASS_BDR}`,
              padding: "0 3vw",
            }}
          >
            <span
              style={{
                width: "0.48vh", height: "0.48vh", borderRadius: "50%",
                background: "#7ecba4",
                display: "inline-block",
                animation: "dotBreathe 3.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "1.28vh",
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
                width: "0.48vh", height: "0.48vh", borderRadius: "50%",
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
              color: CREAM_MID,
              letterSpacing: "0.06em",
            }}
          >
            <LiveClock />
          </div>
        </header>

        {/* ── MENU — 4 frosted glass panels ──────────────── */}
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
                border: `1px solid ${GLASS_BDR}`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                overflow: "hidden",
                animation: `panelRise 1s ease ${ci * 0.13}s both`,
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: "18%", right: "18%",
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${cat.accent}a0, transparent)`,
                }}
              />

              {/* Inner glass top sheen */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: "30%",
                  background:
                    "linear-gradient(180deg, rgba(245,240,228,0.05) 0%, transparent 100%)",
                  borderRadius: "14px 14px 0 0",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div
                style={{
                  padding: "2.2vh 1.8vw",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Category label */}
                <div style={{ marginBottom: "1.5vh", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: "1.1vh",
                      fontWeight: 600,
                      letterSpacing: "0.46em",
                      textTransform: "uppercase",
                      color: cat.accent,
                      marginBottom: "1.1vh",
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

                {/* Item rows */}
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {cat.items.map((item, ii) => {
                    const flatIdx = ci * 5 + ii;
                    const isSpotlit =
                      FLAT_ITEMS[spotlight].ci === ci &&
                      FLAT_ITEMS[spotlight].ii === ii;

                    return (
                      <div key={item.name}>
                        {ii > 0 && (
                          <div
                            style={{ height: "1px", background: CREAM_GHOST, margin: "0 -1.8vw" }}
                          />
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1vw",
                            padding: "1.05vh 0 1.05vh 0.65vw",
                            boxShadow: isSpotlit
                              ? `inset 3px 0 0 ${cat.accent}`
                              : "inset 3px 0 0 transparent",
                            background: isSpotlit
                              ? "rgba(245,240,228,0.05)"
                              : "transparent",
                            transition: "box-shadow 1s ease, background 1s ease",
                            animation: `itemRise 1s ease ${flatIdx * 0.08 + 0.35}s both`,
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

                          <div
                            style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontSize: "2.1vh",
                              fontWeight: 500,
                              color: isSpotlit ? cat.accent : `${cat.accent}c0`,
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
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderTop: `1px solid ${GLASS_BDR}`,
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
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
                          filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.80))",
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
                        lineHeight: 1.25,
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

        @keyframes dustDrift {
          0%,  100% { transform: translate(0, 0) scale(1);      opacity: var(--op, 0.15); }
          28%        { transform: translate(9px, -13px) scale(1.3); opacity: calc(var(--op, 0.15) + 0.06); }
          57%        { transform: translate(-5px, -20px) scale(0.8); opacity: calc(var(--op, 0.15) - 0.05); }
          78%        { transform: translate(12px, -8px) scale(1.1);  opacity: calc(var(--op, 0.15) + 0.04); }
        }

        @keyframes panelRise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes itemRise {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes dotBreathe {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 0.15; transform: scale(0.5); }
        }
      `}</style>
    </div>
  );
}
