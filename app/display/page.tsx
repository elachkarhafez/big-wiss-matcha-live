"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const CREAM      = "#f2ede3";
const CREAM_MID  = "rgba(242,237,227,0.60)";
const CREAM_LOW  = "rgba(242,237,227,0.42)";
const CREAM_FAINT= "rgba(242,237,227,0.07)";

// ── MENU DATA ────────────────────────────────────────────────────────────────
const MENU = [
  {
    category: "Signature",
    accent: "#9ecdb0",
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
    accent: "#b8dfc8",
    items: [
      { name: "Cream Top Matcha",   desc: "Sweet cream foam · velvety texture",   price: "$8.00" },
      { name: "Dirty Matcha",       desc: "Espresso shot · balanced energy",      price: "$8.50" },
      { name: "Strawberry Matcha",  desc: "Fresh strawberry purée · layered",     price: "$9.00" },
      { name: "Vanilla Matcha",     desc: "House vanilla · ceremonial grade",     price: "$8.50" },
      { name: "Brown Sugar Matcha", desc: "Caramelised brown sugar · rich blend", price: "$8.50" },
    ],
  },
  {
    category: "Seasonal",
    accent: "#c9aa6a",
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
    accent: "#c4a57b",
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
  { headline: "Founder-Led",      sub: "Dearborn, MI",           accent: "#9ecdb0" },
  { headline: "Premium Matcha",   sub: "Ceremonial Grade",       accent: "#b8dfc8" },
  { headline: "Now Booking",      sub: "Summer 2026",            accent: "#c9aa6a" },
  { headline: "Event Catering",   sub: "Weddings · Activations", accent: "#9ecdb0" },
  { headline: "Big Energy.",      sub: "Real Matcha.",           accent: "#c4a57b" },
];

function buildMarquee() {
  const slides: { type: "cup" | "card"; data: (typeof CUP_SLIDES)[0] | (typeof BRAND_CARDS)[0] }[] = [];
  const max = Math.max(CUP_SLIDES.length, BRAND_CARDS.length);
  for (let i = 0; i < max; i++) {
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
      3200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0d1a10",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* ── BACKGROUND ──────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>

        {/* Slow cream-swirl overlay — the centrepiece */}
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "180vw", height: "180vw",
            background:
              "conic-gradient(from 0deg at 42% 38%, " +
              "rgba(242,237,227,0.05) 0deg, " +
              "rgba(88,148,108,0.07) 80deg, " +
              "rgba(242,237,227,0.02) 180deg, " +
              "rgba(196,166,100,0.06) 260deg, " +
              "rgba(242,237,227,0.05) 360deg)",
            animation: "creamSwirl 100s linear infinite",
          }}
        />

        {/* Soft ambient pools */}
        <div
          style={{
            position: "absolute", top: "-18%", right: "-4%",
            width: "52vw", height: "52vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(158,205,176,0.13) 0%, transparent 62%)",
            animation: "poolDrift1 28s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-12%", left: "-6%",
            width: "44vw", height: "44vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,165,100,0.10) 0%, transparent 62%)",
            animation: "poolDrift2 34s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute", top: "38%", left: "42%",
            width: "28vw", height: "28vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,237,227,0.04) 0%, transparent 62%)",
            animation: "poolDrift3 42s ease-in-out infinite",
          }}
        />

        {/* Very faint noise-like grain overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            opacity: 0.4,
          }}
        />
      </div>

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
            borderBottom: `1px solid ${CREAM_FAINT}`,
            background: "rgba(9,18,11,0.50)",
            backdropFilter: "blur(16px)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Subtle hairline glow along header bottom */}
          <div
            style={{
              position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(158,205,176,0.35), transparent)",
            }}
          />

          {/* Logo + brand name */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.8vw" }}>
            <div style={{ position: "relative", width: "8.5vh", height: "8.5vh" }}>
              <Image
                src="/logo/logo-v2.png"
                alt="Big Wiss Matcha"
                fill
                style={{ objectFit: "contain", filter: "brightness(1.05) contrast(0.95)" }}
                priority
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontSize: "3.8vh",
                  fontWeight: 500,
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  color: CREAM,
                  lineHeight: 1,
                }}
              >
                Big Wiss Matcha
              </div>
              <div
                style={{
                  fontSize: "1.1vh",
                  fontWeight: 300,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: CREAM_LOW,
                  marginTop: "0.55vh",
                }}
              >
                Dearborn, Michigan
              </div>
            </div>
          </div>

          {/* Centre — booking notice, no badge pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.4vw",
              borderLeft: `1px solid ${CREAM_FAINT}`,
              borderRight: `1px solid ${CREAM_FAINT}`,
              padding: "0 3vw",
            }}
          >
            <span
              style={{
                width: "0.45vh", height: "0.45vh", borderRadius: "50%",
                background: "#9ecdb0",
                display: "inline-block",
                animation: "breathe 3.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "1.25vh",
                fontWeight: 300,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: CREAM_MID,
              }}
            >
              Now Booking · Summer 2026
            </span>
            <span
              style={{
                width: "0.45vh", height: "0.45vh", borderRadius: "50%",
                background: "#9ecdb0",
                display: "inline-block",
                animation: "breathe 3.5s ease-in-out 1.75s infinite",
              }}
            />
          </div>

          {/* Clock */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: "3.4vh",
              fontWeight: 400,
              color: "rgba(242,237,227,0.55)",
              letterSpacing: "0.06em",
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
                padding: "2.2vh 2.2vw",
                borderRight:
                  ci < MENU.length - 1
                    ? `1px solid ${CREAM_FAINT}`
                    : "none",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Category header */}
              <div style={{ marginBottom: "1.6vh", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: "1.1vh",
                    fontWeight: 600,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color: cat.accent,
                    marginBottom: "1.1vh",
                    opacity: 0.85,
                  }}
                >
                  {cat.category}
                </div>
                <div
                  style={{
                    height: "1px",
                    background: `linear-gradient(90deg, ${cat.accent}70, ${cat.accent}15, transparent)`,
                  }}
                />
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75vh", flex: 1 }}>
                {cat.items.map((item, ii) => {
                  const flatIdx = ci * 5 + ii;
                  const isSpotlit =
                    FLAT_ITEMS[spotlight].ci === ci &&
                    FLAT_ITEMS[spotlight].ii === ii;

                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1vw",
                        padding: "1.1vh 1.1vw 1.1vh 1.3vw",
                        borderRadius: "6px",
                        background: isSpotlit
                          ? "rgba(242,237,227,0.065)"
                          : "rgba(242,237,227,0.025)",
                        border: `1px solid rgba(242,237,227,0.07)`,
                        // Inset left bar — the luxury "spotlight" tell
                        boxShadow: isSpotlit
                          ? `inset 2.5px 0 0 ${cat.accent}`
                          : "inset 2.5px 0 0 transparent",
                        transition:
                          "background 1.1s ease, box-shadow 1.1s ease",
                        // Entrance
                        animation: `riseIn 1s ease ${flatIdx * 0.1}s both`,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Item name */}
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                            fontSize: "2.25vh",
                            fontWeight: isSpotlit ? 500 : 400,
                            color: isSpotlit ? CREAM : "rgba(242,237,227,0.88)",
                            lineHeight: 1.2,
                            marginBottom: "0.25vh",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "color 1.1s ease, font-weight 0.6s ease",
                          }}
                        >
                          {item.name}
                        </div>
                        {/* Description */}
                        <div
                          style={{
                            fontSize: "1.2vh",
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
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: "2.1vh",
                          fontWeight: 500,
                          color: cat.accent,
                          flexShrink: 0,
                          letterSpacing: "0.02em",
                          opacity: isSpotlit ? 1 : 0.75,
                          transition: "opacity 1.1s ease",
                          animation: `pricePulse 6s ease-in-out ${flatIdx * 0.3}s infinite`,
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

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <footer
          style={{
            height: "19vh",
            borderTop: `1px solid ${CREAM_FAINT}`,
            background: "rgba(6,14,8,0.40)",
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
              position: "absolute", left: 0, top: 0, bottom: 0, width: "9vw",
              background: "linear-gradient(90deg, #0d1a10 0%, transparent 100%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "9vw",
              background: "linear-gradient(-90deg, #0d1a10 0%, transparent 100%)",
              zIndex: 2, pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              animation: "marquee 42s linear infinite",
              width: "max-content",
            }}
          >
            {[...MARQUEE_SLIDES, ...MARQUEE_SLIDES].map((slide, i) => (
              <div
                key={i}
                style={{
                  width: "20vh",
                  height: "17vh",
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
                          filter:
                            "drop-shadow(0 8px 28px rgba(0,0,0,0.70)) drop-shadow(0 0 6px rgba(158,205,176,0.10))",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "0.6vh" }}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          fontSize: "1.55vh",
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
                          letterSpacing: "0.14em",
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
                      width: "15.5vh",
                      height: "14vh",
                      borderRadius: "8px",
                      border: `1px solid ${(slide.data as typeof BRAND_CARDS[0]).accent}30`,
                      background: `${(slide.data as typeof BRAND_CARDS[0]).accent}0c`,
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
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: "1.9vh",
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
                        background: `${(slide.data as typeof BRAND_CARDS[0]).accent}50`,
                        margin: "0.65vh auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.9vh",
                        fontWeight: 300,
                        color: CREAM_LOW,
                        letterSpacing: "0.16em",
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

        /* Cream swirling into matcha */
        @keyframes creamSwirl {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Ambient light pools */
        @keyframes poolDrift1 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-3%, 5%); }
        }
        @keyframes poolDrift2 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(5%, -3%); }
        }
        @keyframes poolDrift3 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-4%, -4%); }
        }

        /* Marquee scroll */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Tiny dot breathe in header */
        @keyframes breathe {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.6); }
        }

        /* Gentle price shimmer — barely there */
        @keyframes pricePulse {
          0%, 100% { opacity: var(--price-opacity, 0.8); }
          50%       { opacity: 1; }
        }

        /* Menu item entrance — rises like steam */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
