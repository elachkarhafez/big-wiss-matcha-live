"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DROPS, IG_URL as IG, renders, type Drop } from "@/lib/drops";

/* ─────────────────────────────  card  ───────────────────────────── */

function DropCard({
  drop,
  index,
  onOpen,
}: {
  drop: Drop;
  index: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${drop.name}`}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl p-5 text-left transition-transform duration-300 will-change-transform hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1a11]"
      style={{
        background: `linear-gradient(155deg, ${drop.theme.deep} 0%, rgba(8,21,15,0.9) 70%)`,
        border: "1px solid rgba(255,255,255,0.08)",
        // @ts-expect-error -- custom property drives the focus ring colour
        "--tw-ring-color": drop.theme.glow,
      }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: reduce ? 0 : (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* theme glow, blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: drop.theme.glow }}
      />

      {/* peeking cup */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-4 h-40 w-28 opacity-70 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-100"
      >
        <Image
          src={renders(drop.id).still}
          alt=""
          fill
          sizes="112px"
          className="object-contain drop-shadow-2xl"
          style={{ transform: "rotate(-8deg)" }}
        />
      </span>

      <span className="relative z-10 flex flex-wrap items-center gap-1.5">
        {drop.notes.slice(0, 3).map((n) => (
          <span key={n.label} className="text-base leading-none" aria-hidden>
            {n.emoji}
          </span>
        ))}
      </span>

      <h3
        className="relative z-10 mt-3 max-w-[76%] text-[15px] font-bold leading-snug tracking-[-0.01em] text-white"
        style={{ textWrap: "balance" }}
      >
        {drop.name}
      </h3>
      <p
        className="relative z-10 mt-1.5 max-w-[74%] text-[13px] leading-relaxed"
        style={{ color: drop.theme.accent, opacity: 0.75 }}
      >
        {drop.tagline}
      </p>

      <span
        className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] transition-colors"
        style={{ color: drop.theme.glow }}
      >
        Take a look
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </motion.button>
  );
}

/* ───────────────────────────  detail view  ─────────────────────────── */

function DropDetail({
  drop,
  visible,
  onClose,
}: {
  drop: Drop;
  visible: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // keep focus inside the dialog
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      data-drop-detail
      aria-labelledby={`drop-title-${drop.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      onClick={onClose}
    >
      {/* themed ground */}
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${drop.theme.deep} 0%, #060f0a 62%, #040a07 100%)`,
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 backdrop-blur-[2px]"
        style={{ background: "rgba(4,10,7,0.35)" }}
      />

      {/* drifting motes in the flavor colour */}
      {/* Motes use CSS keyframes, not framer-motion: an infinite framer animation
          never settles, and AnimatePresence waits for descendants to settle
          before unmounting — which would leave this overlay stuck on screen. */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                background: drop.theme.glow,
                width: 3 + (i % 4) * 2,
                height: 3 + (i % 4) * 2,
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                filter: "blur(0.5px)",
                animation: `drop-mote ${5 + (i % 5)}s ease-in-out ${i * 0.32}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div
        ref={panelRef}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-6 md:pt-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        <div className="flex w-full justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-all hover:scale-110 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* the cup, angled, floating */}
        <div className="relative mt-1 flex h-[38vh] min-h-[230px] w-full items-center justify-center md:h-[44vh]">
          <motion.span
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: "min(74vw, 420px)",
              height: "min(74vw, 420px)",
              background: drop.theme.glow,
              filter: "blur(70px)",
              opacity: 0.42,
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.42 }}
            transition={{ duration: 0.8, ease }}
          />
          <motion.div
            className="relative h-full w-full max-w-[300px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 70, scale: 0.86, rotate: -14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: -8 }}
            transition={{ duration: 0.85, ease }}
          >
            <div
              className="relative h-full w-full"
              style={
                reduce ? undefined : { animation: "drop-float 6s ease-in-out 0.9s infinite" }
              }
            >
              <Image
                src={renders(drop.id).still}
                alt={`${drop.name} in a Big Wiss Matcha cup`}
                fill
                sizes="(max-width: 768px) 70vw, 300px"
                priority
                className="object-contain"
                style={{ filter: `drop-shadow(0 30px 50px ${drop.theme.deep})` }}
              />
            </div>
          </motion.div>
        </div>

        {/* copy */}
        <motion.p
          className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{ color: drop.theme.glow }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5, ease }}
        >
          {drop.tagline}
        </motion.p>

        <motion.h2
          id={`drop-title-${drop.id}`}
          className="mt-3 text-center font-display font-bold leading-[0.95] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2rem, 7vw, 3.6rem)", textWrap: "balance" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease }}
        >
          {drop.name}
        </motion.h2>

        <motion.p
          className="mt-4 max-w-md text-center text-sm leading-relaxed text-white/55"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, ease }}
        >
          {drop.blurb}
        </motion.p>

        {/* flavor notes */}
        <div className="mt-8 flex w-full max-w-lg flex-col items-center">
          <motion.p
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58, duration: 0.4 }}
          >
            Flavor notes
          </motion.p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {drop.notes.map((note, i) => (
              <motion.span
                key={note.label}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${drop.theme.glow}38`,
                  color: drop.theme.accent,
                }}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.62 + i * 0.07,
                  duration: 0.45,
                  ease,
                }}
              >
                <span className="text-base leading-none" aria-hidden>
                  {note.emoji}
                </span>
                {note.label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* source */}
        <motion.a
          href={drop.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={{
            background: `linear-gradient(135deg, ${drop.theme.glow}30 0%, ${drop.theme.glow}14 100%)`,
            border: `1px solid ${drop.theme.glow}55`,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          See the post
        </motion.a>

        <motion.p
          className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          Posted {drop.posted}
        </motion.p>
      </div>

      <style>{`
        @keyframes drop-mote {
          0%, 100% { transform: translateY(0);     opacity: 0.12; }
          50%      { transform: translateY(-26px); opacity: 0.40; }
        }
        @keyframes drop-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-drop-detail] * { animation: none !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* ───────────────────────────  section  ─────────────────────────── */

const EXIT_MS = 260;

export function SpecialtyDrops() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = DROPS.find((d) => d.id === openId) ?? null;

  const clearExit = () => {
    if (exitTimer.current) {
      clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
  };

  const open = useCallback((id: string) => {
    clearExit();
    setOpenId(id);
    setVisible(true);
  }, []);

  // Unmount is driven by an explicit timer rather than AnimatePresence:
  // presence removal can stall while descendants are still animating, which
  // would leave an invisible full-screen overlay swallowing every click.
  const close = useCallback(() => {
    setVisible(false);
    clearExit();
    exitTimer.current = setTimeout(() => {
      setOpenId(null);
      exitTimer.current = null;
    }, EXIT_MS);
  }, []);

  useEffect(() => clearExit, []);

  return (
    <section
      id="drops"
      className="relative overflow-hidden px-4 py-16 md:px-10 md:py-24 lg:px-16"
      style={{
        background: "linear-gradient(180deg, #0a1a11 0%, #091912 100%)",
        borderTop: "1px solid rgba(125,206,160,0.06)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 80% 10%, rgba(125,206,160,0.09) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
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

          <h2
            className="font-display font-bold leading-[0.92] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.8rem)" }}
          >
            DRINKS{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LIKE&hellip;
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/40">
            The specialty line-up changes from pop-up to pop-up. Tap any drink to
            see it up close &mdash; these are recent drops off the cart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {DROPS.map((drop, i) => (
            <DropCard
              key={drop.id}
              drop={drop}
              index={i}
              onOpen={() => open(drop.id)}
            />
          ))}
        </div>

        <motion.div
          className="mt-9 flex justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/flavors"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-transform hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(125,206,160,0.18) 0%, rgba(80,160,120,0.18) 100%)",
              border: "1px solid rgba(125,206,160,0.35)",
            }}
          >
            See every flavor
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#7dcea0] transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          className="mt-5 text-center text-[11px] leading-relaxed text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Flavors rotate every pop-up &mdash;{" "}
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7dcea0] underline underline-offset-2 transition-colors hover:text-white"
          >
            follow @whatatastematcha
          </a>{" "}
          for the next drop.
        </motion.p>
      </div>

      {active ? (
        <DropDetail key={active.id} drop={active} visible={visible} onClose={close} />
      ) : null}
    </section>
  );
}
