"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DROPS, renders } from "@/lib/drops";
import { NEXT_POPUP } from "@/lib/popup";

const HOLD_MS = 2600; // how long a served cup stays before the auto-cycle pours the next one

/**
 * Signature: "Pick your pour". Every flavor is rendered from one 3D model of the brand's cup.
 * Tapping a flavor plays its pour clip (fill -> lid lands -> heart pops). Until the visitor
 * touches it, the stage cycles through the line-up on its own; it pauses offscreen, on a hidden
 * tab, and entirely under reduced motion (posters only).
 */
export function HeroPour() {
  const reducePref = useReducedMotion();
  // The server can't know the visitor's motion preference; apply it after mount so hydration matches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && reducePref;
  const hold = !mounted || reducePref; // effects: never animate before we know the preference
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [pop, setPop] = useState(0);
  const [inView, setInView] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const drop = DROPS[index];
  const r = renders(drop.id);
  const onBoard = NEXT_POPUP.flavors.includes(drop.id);

  const choose = useCallback((i: number, byUser: boolean) => {
    setIndex((i + DROPS.length) % DROPS.length);
    if (byUser) setTouched(true);
  }, []);

  // Play the active clip from the start whenever the flavor changes.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || hold) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [index, hold]);

  // Heart pop lands with the clip's own heart (~1.9s in); instant under reduced motion.
  useEffect(() => {
    const t = setTimeout(() => setPop((n) => n + 1), reduce ? 0 : 1900);
    return () => clearTimeout(t);
  }, [index, reduce]);

  // Auto-cycle until the visitor takes over.
  useEffect(() => {
    if (touched || hold || !inView) return;
    const v = videoRef.current;
    let t: ReturnType<typeof setTimeout>;
    const next = () => { t = setTimeout(() => { if (!document.hidden) choose(index + 1, false); }, HOLD_MS); };
    if (v && !v.ended) v.addEventListener("ended", next, { once: true });
    else next();
    return () => { clearTimeout(t); v?.removeEventListener("ended", next); };
  }, [index, touched, hold, inView, choose]);

  // Idle nudge on the flavor rail if nobody has touched it after a few seconds.
  useEffect(() => {
    if (touched || hold) return;
    const t = setInterval(() => { setNudge(true); setTimeout(() => setNudge(false), 750); }, 5200);
    return () => clearInterval(t);
  }, [touched, hold]);

  // Pause when the stage leaves the viewport.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      const v = videoRef.current;
      if (v && !e.isIntersecting) v.pause();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k !== "ArrowRight" && k !== "ArrowLeft" && k !== "Home" && k !== "End") return;
    e.preventDefault();
    const i = k === "Home" ? 0 : k === "End" ? DROPS.length - 1 : index + (k === "ArrowRight" ? 1 : -1);
    const n = (i + DROPS.length) % DROPS.length;
    choose(n, true);
    tabsRef.current[n]?.focus();
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d2a1a 0%, #163a26 38%, #0f2a1c 72%, #0a1a11 100%)" }}
    >
      {/* flavor-tinted bloom behind the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{ background: `radial-gradient(ellipse 55% 60% at 72% 48%, ${drop.theme.glow}33 0%, transparent 62%), radial-gradient(ellipse 70% 50% at 20% 0%, rgba(125,206,160,0.14) 0%, transparent 60%)` }}
      />

      <div className="bw-shell relative grid min-h-[100svh] grid-cols-1 items-center gap-10 pb-14 pt-24 md:pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-20">
        {/* copy */}
        <div className="order-1 min-w-0 text-center lg:text-left">
          <p className="bw-kicker justify-center lg:justify-start">
            <Heart className="h-3 w-3" /> Founder-led matcha · Dearborn, MI
          </p>
          <h1 className="mt-5 font-display font-extrabold uppercase leading-[0.86] tracking-[-0.035em] text-white" style={{ fontSize: "clamp(3.4rem, 2rem + 6.4vw, 7.6rem)" }}>
            What a
            <span className="relative block normal-case">
              <span className="bw-accent text-[#9ee0b8]" style={{ fontSize: "1.12em", lineHeight: 0.9 }}>taste</span>
              <span key={pop} className="bw-heart-pop ml-2 inline-block align-[0.1em]" style={{ width: "0.32em" }}>
                <Heart className="h-auto w-full" title="heart" />
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-[1.06rem] leading-relaxed text-white/70 lg:mx-0 lg:text-[1.15rem]">
            Handcrafted matcha poured off Big Wiss&rsquo;s cart. A new dessert flavor every pop-up, and the whole cart for your event.
          </p>
          <div className="mt-8 hidden flex-wrap items-center gap-3 lg:flex">
            <Link href="/catering" className="bw-btn bw-btn-gold">Book the cart <Heart className="h-3.5 w-3.5" color="#0a1a11" /></Link>
            <a href="#popup" className="bw-btn bw-btn-ghost">Next pop-up</a>
          </div>
        </div>

        {/* stage */}
        <div className="order-2 mx-auto w-full min-w-0 max-w-[480px] lg:max-w-[min(500px,calc((100svh-250px)*0.75))]">
          <div
            ref={stageRef}
            role="button"
            tabIndex={0}
            aria-label={`${drop.name} is poured. Pour the next flavor`}
            onClick={() => choose(index + 1, true)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(index + 1, true); } }}
            className="relative cursor-pointer overflow-hidden rounded-[28px] shadow-[0_40px_90px_rgba(0,0,0,0.45)] transition-[background-color,transform] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7dcea0] active:scale-[0.99]"
            style={{ background: drop.backdrop, aspectRatio: "3 / 4" }}
          >
            {!touched ? (
              <span className={`absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#0a1a11] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white shadow-lg ${nudge ? "bw-nudge" : ""}`}>
                <span aria-hidden>👆</span>
                <span className="md:hidden">Tap the cup</span>
                <span className="hidden md:inline">Click the cup</span>
              </span>
            ) : null}
            {/* Always the same element on server and client; under reduced motion it never plays, so the poster is the cup. */}
            <video
              key={drop.id}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={r.poster}
              muted
              playsInline
              preload="auto"
              aria-label={`${drop.name} matcha in the Big Wiss cup`}
            >
              <source src={r.webm} type="video/webm" />
              <source src={r.mp4} type="video/mp4" />
            </video>

          </div>

          {/* name */}
          <div className="mt-5 flex items-end justify-between gap-4 text-left">
            <div>
              <p className="bw-accent text-[2rem] leading-none text-white sm:text-[2.3rem]" aria-live="polite">{drop.name}</p>
              <p className="mt-1.5 text-[0.88rem] text-white/60">{drop.tagline}</p>
            </div>
            {onBoard ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#7dcea0]/40 bg-[#7dcea0]/10 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#9ee0b8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7dcea0]" /> This weekend
              </span>
            ) : null}
          </div>

          {/* flavor rail */}
          <div className="relative mt-5">
            {!touched && !reduce ? (
              <p className={`mb-3 flex items-center justify-center gap-2 text-[0.8rem] font-semibold text-[#c4f0d5] ${nudge ? "bw-nudge" : ""}`}>
                <span aria-hidden>👆</span>
                <span className="md:hidden">Tap a flavor, watch it pour</span>
                <span className="hidden md:inline">Pick a flavor, watch it pour</span>
              </p>
            ) : null}
            <div
              role="tablist"
              aria-label="Specialty flavors"
              onKeyDown={onKey}
              className={`bw-noscrollbar -mx-[var(--bw-pad)] flex snap-x gap-2 overflow-x-auto px-[var(--bw-pad)] pb-1 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 ${nudge ? "bw-nudge" : ""}`}
            >
              {DROPS.map((d, i) => {
                const active = i === index;
                return (
                  <button
                    key={d.id}
                    ref={(el) => { tabsRef.current[i] = el; }}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => choose(i, true)}
                    className="flex shrink-0 snap-start items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dcea0]"
                    style={{
                      background: active ? d.backdrop : "rgba(255,255,255,0.06)",
                      color: active ? "#1a1a1a" : "rgba(255,255,255,0.82)",
                      border: `1px solid ${active ? d.backdrop : "rgba(255,255,255,0.12)"}`,
                    }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.theme.glow }} aria-hidden />
                    {d.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* mobile CTAs sit under the stage */}
        <div className="order-3 flex flex-col gap-3 sm:flex-row sm:justify-center lg:hidden">
          <Link href="/catering" className="bw-btn bw-btn-gold">Book the cart <Heart className="h-3.5 w-3.5" color="#0a1a11" /></Link>
          <a href="#popup" className="bw-btn bw-btn-ghost">Next pop-up</a>
        </div>
      </div>
    </section>
  );
}
