"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DROPS, renders } from "@/lib/drops";
import { NEXT_POPUP } from "@/lib/popup";

const HOLD_MS = 2600; // how long a served cup stays before the auto-cycle pours the next one
const CYCLE_MS = 2800 + HOLD_MS; // pour clip + hold

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

  // A few degrees of tilt toward a fine pointer; nothing on touch or under reduced motion.
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (hold || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setTilt({ x: +(-py * 6).toFixed(2), y: +(px * 8).toFixed(2) });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });
  const autoCycling = !touched && !hold && inView;

  // Segmented control: slide the coloured thumb under the active flavor, and keep it in view.
  const segRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const place = () => {
      const b = tabsRef.current[index];
      if (!b) return;
      setThumb({ x: b.offsetLeft, w: b.offsetWidth });
      const seg = segRef.current;
      if (seg && seg.scrollWidth > seg.clientWidth) {
        seg.scrollTo({ left: b.offsetLeft - (seg.clientWidth - b.offsetWidth) / 2, behavior: hold ? "auto" : "smooth" });
      }
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [index, hold]);

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
      style={{ background: "radial-gradient(120% 80% at 50% 0%, #1b4430 0%, #0f2a1c 46%, #0a1a11 100%)" }}
    >
      {/* flavor-tinted bloom behind the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{ background: `radial-gradient(ellipse 60% 45% at 50% 62%, ${drop.theme.glow}2e 0%, transparent 65%)` }}
      />

      {/* giant flavor name, swaps with each pour */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[38%] flex justify-center overflow-hidden lg:top-1/2 lg:-translate-y-1/2 lg:justify-end">
        <p
          key={drop.id}
          className="bw-watermark bw-accent whitespace-nowrap leading-none text-white/[0.045] lg:-mr-[6vw]"
          style={{ fontSize: "clamp(6rem, 3rem + 16vw, 19rem)" }}
        >
          {drop.name}
        </p>
      </div>

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1320px] grid-cols-1 content-start items-center gap-7 pb-10 pt-[88px] lg:grid-cols-[1.05fr_1fr] lg:content-center lg:gap-16 lg:px-[var(--bw-pad)] lg:pb-20 lg:pt-28">
        {/* copy */}
        <div className="sd-hero-copy order-1 min-w-0 px-[var(--bw-pad)] text-center lg:px-0 lg:text-left">
          <p className="bw-kicker bw-fade-in justify-center lg:justify-start" style={{ ["--d" as string]: "80ms" }}>
            <Heart className="h-3 w-3" /> Big Wiss Matcha · Dearborn
          </p>
          <h1 className="bw-h mt-4 text-white" style={{ fontSize: "clamp(3.6rem, 2.2rem + 7vw, 8.4rem)" }}>
            <span className="bw-line"><span style={{ ["--d" as string]: "120ms" }}>What a</span></span>
            <span className="bw-line">
              <span style={{ ["--d" as string]: "260ms" }}>
                <span className="bw-accent text-[#9ee0b8]" style={{ fontSize: "1.08em" }}>taste.</span>
                <span key={pop} className="bw-heart-pop ml-2 inline-block align-[0.08em]" style={{ width: "0.3em" }}>
                  <Heart className="h-auto w-full" title="heart" />
                </span>
              </span>
            </span>
          </h1>
          <p style={{ ["--d" as string]: "480ms" }} className="bw-fade-in bw-sub mx-auto mt-5 max-w-[30rem] text-white/70 lg:mx-0">
            Handcrafted matcha off Big Wiss&rsquo;s cart. A new dessert flavor every pop-up, and the whole cart for your event.
          </p>
          <div style={{ ["--d" as string]: "620ms" }} className="bw-fade-in mt-8 hidden flex-wrap items-center gap-3 lg:flex">
            <Link href="/catering" className="bw-btn bw-btn-gold">Book the cart <Heart className="h-3.5 w-3.5" color="#0a1a11" /></Link>
            <a href="#popup" className="bw-btn bw-btn-ghost">Next pop-up</a>
          </div>
        </div>

        {/* stage */}
        <div className="bw-stage-in order-2 mx-auto w-full min-w-0 max-w-[560px] px-3 sm:px-[var(--bw-pad)] lg:max-w-[min(500px,calc((100svh-260px)*0.75))] lg:px-0" style={{ ["--d" as string]: "300ms" }}>
         <div className="sd-hero-stage">
          <div onPointerMove={onTilt} onPointerLeave={resetTilt} style={{ perspective: "1100px" }}>
          <div
            ref={stageRef}
            role="button"
            tabIndex={0}
            aria-label={`${drop.name} is poured. Pour the next flavor`}
            onClick={() => choose(index + 1, true)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(index + 1, true); } }}
            className="relative cursor-pointer overflow-hidden rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-[background-color,transform] duration-500 [transition-timing-function:var(--bw-ease)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7dcea0] active:scale-[0.985]"
            style={{ background: drop.backdrop, aspectRatio: "3 / 4", transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
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

            {/* name, set into the frame like a product label */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
              <div className="rounded-2xl bg-white/55 px-3.5 py-2 backdrop-blur-md">
                <p className="bw-accent text-[1.35rem] leading-none text-[#1a1a1a] sm:text-[1.6rem]" aria-live="polite">{drop.name}</p>
                <p className="mt-1 text-[0.72rem] font-semibold text-[#1a1a1a]/65">{drop.tagline}</p>
              </div>
              {onBoard ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0a1a11] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#9ee0b8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7dcea0]" /> This weekend
                </span>
              ) : null}
            </div>

            {!touched ? (
              <span className={`absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0a1a11]/85 px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur ${nudge ? "bw-nudge" : ""}`}>
                <span aria-hidden>👆</span>
                <span className="md:hidden">Tap to pour</span>
                <span className="hidden md:inline">Click to pour the next one</span>
              </span>
            ) : null}

            {/* time until the next auto-pour */}
            {autoCycling ? (
              <span key={`p-${index}`} aria-hidden className="bw-progress absolute inset-x-0 bottom-0 h-[3px] bg-[#0a1a11]/45" style={{ ["--dur" as string]: `${CYCLE_MS}ms` }} />
            ) : null}
          </div>
          </div>
         </div>

          {/* segmented flavor control */}
          <div
            ref={segRef}
            role="tablist"
            aria-label="Specialty flavors"
            onKeyDown={onKey}
            className="bw-seg bw-noscrollbar mt-5 overflow-x-auto"
          >
            <span aria-hidden className="bw-seg-thumb" style={{ width: thumb.w, transform: `translateX(${thumb.x - 4}px)`, left: 4, background: drop.backdrop }} />
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
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dcea0]"
                  style={{ color: active ? "#1a1a1a" : "rgba(255,255,255,0.78)" }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: d.theme.glow }} aria-hidden />
                  {d.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
