"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * "Up close": one Blender camera move (macro on the heart -> the gold print -> the layers -> the
 * full cup), scrubbed by scroll. The film is a short, frequently-keyframed video, so seeking is
 * cheap and only one decoded frame is ever held in memory. The rAF loop runs only while the
 * section is on screen. Reduced motion: three stills with their captions, no pinning.
 */
const SCENES = [
  { from: 0.0, to: 0.2, kicker: "Up close", title: "That red heart\non the lid.", body: "The little stopper you'll spot on a Big Wiss cup." },
  { from: 0.26, to: 0.46, kicker: "The print", title: "Big Wiss,\nin gold.", body: "The script logo, foil-gold, on the cup itself." },
  { from: 0.5, to: 0.7, kicker: "The pour", title: "Layered, one\nmatcha at a time.", body: "Strawberry, then cream, then matcha. Built from the bottom up." },
  { from: 0.8, to: 1.01, kicker: "Served", title: "What a\ntaste.", body: "Strawberry Shortcake, shown here. Seven flavors and counting." },
];
const STILLS = [
  { src: "/flavors/up-close-0.webp", scene: 0 },
  { src: "/flavors/up-close-1.webp", scene: 1 },
  { src: "/flavors/up-close-2.webp", scene: 2 },
];

function sceneAlpha(p: number, s: (typeof SCENES)[number]) {
  const fade = 0.05;
  if (p < s.from - fade || p > s.to + fade) return 0;
  if (p < s.from) return (p - (s.from - fade)) / fade;
  if (p > s.to) return 1 - (p - s.to) / fade;
  return 1;
}

export function UpClose() {
  const reducePref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const still = mounted && reducePref;

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  // Load the film when the section is within a screen of the viewport; phones get the lighter cut.
  useEffect(() => {
    if (still) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setSrc(window.innerWidth < 768 ? "/flavors/up-close-540.mp4" : "/flavors/up-close-720.mp4");
      io.disconnect();
    }, { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  // Scrub loop: only while on screen. Three things keep it smooth:
  //  1. the shown time eases toward the scroll target (frame-rate independent), so scroll
  //     steps and trackpad bursts become one continuous move instead of jumps;
  //  2. a new seek is only issued once the previous one has landed (no seek pile-up);
  //  3. captions and the progress bar follow the same eased value, so text and film agree.
  useEffect(() => {
    if (still || !src) return;
    const sec = sectionRef.current, v = videoRef.current;
    if (!sec || !v) return;
    const FPS = 30;
    let raf = 0, running = false, primed = false;
    let eased = -1;        // seconds, what we're steering the film toward
    let requested = -1;    // last currentTime we asked for
    let last = performance.now();

    const prime = () => {
      if (primed) return;
      primed = true;
      // iOS only paints seeks after the media has been played once; pause on the very next frame.
      const p = v.play();
      if (p) p.then(() => { v.pause(); }).catch(() => {});
    };

    const progress = () => {
      const r = sec.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / Math.max(1, span)));
    };

    const paint = (p: number) => {
      SCENES.forEach((s, i) => {
        const el = capRefs.current[i];
        if (!el) return;
        const a = sceneAlpha(p, s);
        el.style.opacity = String(a);
        el.style.transform = `translate3d(0, ${((1 - a) * 18).toFixed(2)}px, 0)`;
        el.style.visibility = a > 0.01 ? "visible" : "hidden";
      });
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const dur = v.duration;
      const p = progress();
      if (dur && isFinite(dur)) {
        const target = p * (dur - 1 / FPS);
        if (eased < 0) eased = target;
        const k = 1 - Math.exp(-dt * 9); // ~110 ms to settle: smooth, still tied to the finger
        eased += (target - eased) * k;
        if (Math.abs(target - eased) < 0.0015) eased = target;
        if (!v.seeking && Math.abs(eased - requested) >= 0.5 / FPS) {
          requested = eased;
          v.currentTime = eased;
        }
        paint(eased / (dur - 1 / FPS));
      } else {
        paint(p);
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; prime(); last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(sec);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); };
  }, [still, src]);

  if (still) {
    return (
      <section aria-labelledby="upclose-title" className="bg-[#24352a] py-20">
        <h2 id="upclose-title" className="sr-only">Up close</h2>
        <div className="bw-shell grid gap-12 md:grid-cols-3">
          {STILLS.map((s) => (
            <figure key={s.src}>
              <div className="relative aspect-[9/16] overflow-hidden rounded-[28px]">
                <Image src={s.src} alt="" fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover" />
              </div>
              <figcaption className="mt-5">
                <p className="bw-kicker">{SCENES[s.scene].kicker}</p>
                <p className="bw-h mt-2 whitespace-pre-line text-[2rem] text-white">{SCENES[s.scene].title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="upclose-title" className="relative h-[420vh] bg-[#24352a]">
      <h2 id="upclose-title" className="sr-only">Up close: the Big Wiss cup</h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the film: full-bleed on phones, a tall centred frame on wide screens */}
        <div className="absolute inset-0 md:left-[60%] md:w-[min(100vw,calc(100svh*9/16))] md:-translate-x-1/2">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={src ?? undefined}
            poster="/flavors/up-close-0.webp"
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
          {/* soft edges into the section colour on wide screens */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-px hidden w-24 bg-gradient-to-r from-[#24352a] to-transparent md:block" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 -right-px hidden w-24 bg-gradient-to-l from-[#24352a] to-transparent md:block" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0a1a11] via-[#0a1a11]/70 to-transparent md:hidden" />
        </div>

        {/* captions */}
        {SCENES.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => { capRefs.current[i] = el; }}
            className="pointer-events-none absolute inset-x-0 bottom-[max(6.5rem,10svh)] will-change-[opacity,transform] px-[var(--bw-pad)] text-center md:inset-x-auto md:bottom-auto md:left-[max(var(--bw-pad),calc((100vw-1320px)/2+var(--bw-pad)))] md:top-1/2 md:w-[min(34vw,480px)] md:-translate-y-1/2 md:text-left"
            style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
          >
            <p className="bw-kicker justify-center md:justify-start"><Heart className="h-3 w-3" /> {s.kicker}</p>
            <p className="bw-h mt-3 whitespace-pre-line text-[clamp(2.4rem,1.6rem+3.6vw,4.6rem)] text-white md:text-[clamp(2.4rem,1.2rem+2.4vw,3.8rem)]">{s.title}</p>
            <p className="mx-auto mt-4 max-w-[30ch] text-[1.02rem] leading-relaxed text-white/70 md:mx-0">{s.body}</p>
          </div>
        ))}

        {/* progress */}
        <div aria-hidden className="absolute inset-x-[var(--bw-pad)] bottom-[max(2.5rem,4svh)] h-[2px] overflow-hidden rounded-full bg-white/10 md:inset-x-auto md:left-1/2 md:w-40 md:-translate-x-1/2">
          <div ref={barRef} className="h-full origin-left bg-[#9ee0b8]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
