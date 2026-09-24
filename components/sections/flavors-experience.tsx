"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DROPS, IG_URL, type Drop } from "@/lib/drops";

const N = DROPS.length;
const SEG = 1 / N;
const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const N_WORD = COUNT_WORDS[N] ?? String(N);

/**
 * Crossfade shape, in fractions of a segment either side of a scene's centre.
 *
 * A scene holds full opacity across most of its segment and swaps over a short
 * band at the boundary: scene i fades out over exactly the band scene i+1 fades
 * in over, so the pair is always complementary (total opacity stays at 1, no
 * blank frame) while the window where both are on screen stays short enough
 * that the copy never reads as doubled.
 */
const HOLD = 0.4;      // fully opaque out to ±0.40 of a segment from centre
const SWAP = 0.6;      // fully gone by ±0.60 — a 20% crossfade band
// The copy swaps sequentially rather than crossfading: one block is fully gone
// before the next appears, so two names/blurbs are never on screen together.
// Verified: two-blocks-visible 0.00% of scroll, with a 3.5% beat between them.
const TEXT_HOLD = 0.4;
const TEXT_SWAP = 0.48;

/* ─────────────────────────  one scrolling scene  ───────────────────────── */

function Scene({
  drop,
  index,
  progress,
}: {
  drop: Drop;
  index: number;
  progress: MotionValue<number>;
}) {
  const first = index === 0;
  const last = index === N - 1;
  const centre = (index + 0.5) * SEG;

  const inA = centre - SEG * SWAP;
  const inB = centre - SEG * HOLD;
  const outA = centre + SEG * HOLD;
  const outB = centre + SEG * SWAP;

  const opacity = useTransform(
    progress,
    [inA, inB, outA, outB],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );

  const textOpacity = useTransform(
    progress,
    [
      centre - SEG * TEXT_SWAP,
      centre - SEG * TEXT_HOLD,
      centre + SEG * TEXT_HOLD,
      centre + SEG * TEXT_SWAP,
    ],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );

  // Cup and copy travel at slightly different rates for depth, but the gap
  // between them is sized for the *difference* (±16px), not the individual
  // amounts — on mobile they stack, so any larger drift closes the gap and the
  // blocks collide.
  const cupY = useTransform(progress, [inA, outB], [40, -40]);
  const cupScale = useTransform(progress, [inA, centre, outB], [0.92, 1, 0.92]);
  const cupRotate = useTransform(progress, [inA, outB], [-10, -4]);
  const textY = useTransform(progress, [inA, outB], [24, -24]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-11 px-6 sm:gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-10 lg:gap-16">
        {/* the cup — right on desktop, above the copy on mobile */}
        <motion.div
          className="relative order-1 mx-auto h-[26vh] w-full max-w-[190px] sm:h-[30vh] sm:max-w-[230px] md:order-2 md:h-[62vh] md:max-w-[420px]"
          style={{ y: cupY, scale: cupScale, rotate: cupRotate }}
        >
          <Image
            src={drop.cup}
            alt={`${drop.name} in a Big Wiss Matcha cup`}
            fill
            sizes="(max-width: 768px) 45vw, 420px"
            priority={index < 2}
            className="object-contain"
            style={{ filter: `drop-shadow(0 34px 60px ${drop.theme.deep})` }}
          />
        </motion.div>

        {/* the copy — left on desktop */}
        <motion.div
          className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left"
          style={{ y: textY, opacity: textOpacity }}
        >
          <p
            className="text-[9px] font-bold uppercase tracking-[0.26em] sm:text-[10px]"
            style={{ color: drop.theme.glow }}
          >
            {drop.tagline}
          </p>

          <h2
            className="mt-2.5 font-display font-bold leading-[0.95] tracking-[-0.03em] text-white sm:mt-3"
            style={{ fontSize: "clamp(1.6rem, 5.4vw, 3.4rem)", textWrap: "balance" }}
          >
            {drop.name}
          </h2>

          <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-white/55 sm:mt-4 sm:text-sm">
            {drop.blurb}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-5 sm:gap-2 md:justify-start">
            {drop.notes.map((note) => (
              <span
                key={note.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[12px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${drop.theme.glow}3D`,
                  color: drop.theme.accent,
                }}
              >
                <span className="text-[14px] leading-none" aria-hidden>
                  {note.emoji}
                </span>
                {note.label}
              </span>
            ))}
          </div>

          <a
            href={drop.source}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:mt-6 sm:px-6 sm:py-3 sm:text-[11px]"
            style={{
              background: `linear-gradient(135deg, ${drop.theme.glow}30 0%, ${drop.theme.glow}14 100%)`,
              border: `1px solid ${drop.theme.glow}55`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            See the post &middot; {drop.posted}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────  static fallback  ─────────────────────────── */

function StaticList() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-16">
      {DROPS.map((drop) => (
        <article
          key={drop.id}
          className="flex flex-col items-center gap-5 rounded-3xl p-7 text-center sm:flex-row sm:text-left"
          style={{
            background: `linear-gradient(150deg, ${drop.theme.deep} 0%, rgba(8,21,15,0.92) 75%)`,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="relative h-40 w-28 flex-none">
            <Image
              src={drop.cup}
              alt={`${drop.name} in a Big Wiss Matcha cup`}
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: drop.theme.glow }}
            >
              {drop.tagline}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">{drop.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{drop.blurb}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {drop.notes.map((n) => (
                <span
                  key={n.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${drop.theme.glow}3D`,
                    color: drop.theme.accent,
                  }}
                >
                  <span aria-hidden>{n.emoji}</span>
                  {n.label}
                </span>
              ))}
            </div>
            <a
              href={drop.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.14em] underline underline-offset-4"
              style={{ color: drop.theme.glow }}
            >
              See the post &middot; {drop.posted}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─────────────────────────────  the page  ───────────────────────────── */

export function FlavorsExperience() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Ground + glow blend from one flavor to the next as you scroll.
  const centers = DROPS.map((_, i) => (i + 0.5) * SEG);
  const bg = useTransform(scrollYProgress, centers, DROPS.map((d) => d.theme.deep));
  const glow = useTransform(scrollYProgress, centers, DROPS.map((d) => d.theme.glow));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(v / SEG)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <main className="relative" style={{ background: "#060f0a" }}>
      {/* ── intro ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(125,206,160,0.12) 0%, transparent 62%)",
          }}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              border: "1px solid rgba(125,206,160,0.3)",
              background: "rgba(125,206,160,0.07)",
            }}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#7dcea0]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7dcea0]">
              Rotating Specialty Drops
            </span>
          </div>

          <h1
            className="font-display font-bold leading-[0.9] tracking-[-0.035em] text-white"
            style={{ fontSize: "clamp(2.6rem, 10vw, 6rem)", textWrap: "balance" }}
          >
            FEATURED{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FLAVORS
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/45">
            {N_WORD} drops off the cart, each announced on our feed. Keep scrolling
            &mdash; the whole room changes with every drink.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2 text-white/30">
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]">Scroll</span>
            <motion.span
              className="block h-8 w-[1px]"
              style={{ background: "linear-gradient(180deg, #7dcea0, transparent)" }}
              animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {reduce ? (
        <StaticList />
      ) : (
        <div ref={trackRef} style={{ height: `${N * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* flavor ground */}
            <motion.div aria-hidden className="absolute inset-0" style={{ background: bg }} />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,15,10,0.55) 0%, transparent 30%, transparent 68%, rgba(6,15,10,0.75) 100%)",
              }}
            />
            {/* the glow that follows the flavor */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full md:left-[68%] md:top-1/2"
              style={{
                width: "min(86vw, 540px)",
                height: "min(86vw, 540px)",
                background: glow,
                filter: "blur(90px)",
                opacity: 0.32,
              }}
            />
            {/* motes */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(16)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: glow,
                    width: 3 + (i % 4) * 2,
                    height: 3 + (i % 4) * 2,
                    left: `${(i * 37) % 100}%`,
                    top: `${(i * 53) % 100}%`,
                    filter: "blur(0.5px)",
                    animation: `flv-mote ${5 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>

            {DROPS.map((drop, i) => (
              <Scene key={drop.id} drop={drop} index={i} progress={scrollYProgress} />
            ))}

            {/* progress rail */}
            <nav
              aria-label="Flavor progress"
              className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-7"
            >
              {DROPS.map((drop, i) => (
                <button
                  key={drop.id}
                  type="button"
                  aria-label={`Jump to ${drop.name}`}
                  aria-current={active === i ? "true" : undefined}
                  onClick={() => {
                    const el = trackRef.current;
                    if (!el) return;
                    const top = el.offsetTop + (i + 0.35) * window.innerHeight;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                  className="group flex items-center justify-end gap-2 focus:outline-none"
                >
                  <span
                    className="hidden text-[9px] font-bold uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                    style={{ color: drop.theme.accent }}
                  >
                    {drop.name.split(" ")[0]}
                  </span>
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: active === i ? 9 : 6,
                      height: active === i ? 9 : 6,
                      background: active === i ? drop.theme.glow : "rgba(255,255,255,0.28)",
                      boxShadow: active === i ? `0 0 12px ${drop.theme.glow}` : "none",
                    }}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── outro ── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(125,206,160,0.10) 0%, transparent 62%)",
          }}
        />
        <div className="relative z-10">
          <h2
            className="font-display font-bold leading-[0.94] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(1.8rem, 5.5vw, 3rem)", textWrap: "balance" }}
          >
            The line-up changes<br />every pop-up.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/45">
            Follow along for whatever drops next, or book the cart for your own event.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,206,160,0.18) 0%, rgba(80,160,120,0.18) 100%)",
                border: "1px solid rgba(125,206,160,0.35)",
              }}
            >
              Follow @bigwissmatcha
            </a>
            <Link
              href="/catering"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#0f2318] transition-transform hover:scale-105"
            >
              Book the cart
            </Link>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-white"
          >
            &larr; Back to home
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes flv-mote {
          0%, 100% { transform: translateY(0);     opacity: 0.12; }
          50%      { transform: translateY(-28px); opacity: 0.42; }
        }
      `}</style>
    </main>
  );
}
