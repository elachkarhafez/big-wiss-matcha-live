"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DROPS, IG_URL, renders, type Drop } from "@/lib/drops";
import { NEXT_POPUP } from "@/lib/popup";

/**
 * The line-up. Desktop (where scroll-driven animation runs): the section pins and the cards travel
 * sideways with the scroll. Each card's still is the first frame of that cup's 360° turntable, so
 * hovering (or, on touch, centring) a card crossfades into the cup turning. Server-safe: the still
 * is always rendered; the turntable video only loads on first use.
 */
function Card({ d, active, onHover }: { d: Drop; active: boolean; onHover: (on: boolean) => void }) {
  const r = renders(d.id);
  const live = NEXT_POPUP.flavors.includes(d.id);
  const vid = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (active && !armed) setArmed(true);
  }, [active, armed]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (active && armed) {
      v.load();
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [active, armed]);

  return (
    <li data-card={d.id} className="w-[78vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none">
      <article
        onPointerEnter={(e) => e.pointerType === "mouse" && onHover(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && onHover(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] transition-transform duration-500 [transition-timing-function:var(--bw-ease)] hover:-translate-y-2"
        style={{ background: d.backdrop }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={r.photo}
            alt={`${d.name} matcha in the Big Wiss cup (3D render)`}
            fill
            sizes="(max-width: 768px) 78vw, (max-width: 1280px) 33vw, 300px"
            className="object-cover"
          />
          <video
            ref={vid}
            className="bw-spin absolute inset-0 h-full w-full object-cover"
            data-on={active}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          >
            {armed ? <source src={r.spinWebm} type="video/webm" /> : null}
            {armed ? <source src={r.spinMp4} type="video/mp4" /> : null}
          </video>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4" style={{ background: `linear-gradient(180deg, transparent, ${d.backdrop})` }} />
          {live ? (
            <span className="absolute left-4 top-4 rounded-full bg-[#0a1a11] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#9ee0b8]">This weekend</span>
          ) : null}
          <span aria-hidden className="absolute right-4 top-4 hidden rounded-full bg-white/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:hover)]:inline">
            360°
          </span>
        </div>
        <div className="flex flex-1 flex-col px-5 pb-5 pt-1 text-[#1a1a1a]">
          <h3 className="bw-accent text-[1.75rem] leading-none">{d.name}</h3>
          <p className="mt-2 text-[0.9rem] leading-snug text-[#1a1a1a]/70">{d.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Flavor notes">
            {d.notes.slice(0, 3).map((n) => (
              <li key={n.label} className="rounded-full bg-white/55 px-2.5 py-1 text-[0.72rem] font-semibold">
                <span aria-hidden>{n.emoji}</span> {n.label}
              </li>
            ))}
          </ul>
          <a
            href={d.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/60 underline-offset-4 hover:text-[#1a1a1a] hover:underline"
          >
            Posted {d.posted} ↗
          </a>
        </div>
      </article>
    </li>
  );
}

export function FlavorLineup() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [centred, setCentred] = useState<string | null>(null);

  // How far the rail must travel when pinned: track width minus the visible width.
  useEffect(() => {
    const sec = sectionRef.current, track = trackRef.current;
    if (!sec || !track) return;
    const measure = () => {
      const visible = track.parentElement?.clientWidth ?? window.innerWidth;
      sec.style.setProperty("--rail-dist", `${Math.max(0, track.scrollWidth - visible)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // Touch: the card most in view spins on its own.
  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: none)").matches) return;
    const track = trackRef.current;
    if (!track) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set((e.target as HTMLElement).dataset.card ?? "", e.intersectionRatio));
      let best: string | null = null;
      let max = 0.6;
      ratios.forEach((v, k) => { if (v > max) { max = v; best = k; } });
      setCentred(best);
    }, { threshold: [0, 0.6, 0.8, 1] });
    track.querySelectorAll("[data-card]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  const spinning = reduce ? null : hovered ?? centred;

  return (
    <section ref={sectionRef} id="flavors" aria-labelledby="flavors-title" className="sd-rail-section relative bg-[#0a1a11]">
      <div className="sd-rail-sticky py-20 md:py-28">
        <div className="bw-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="sd-rise sd-rail-intro">
              <p className="bw-kicker"><Heart className="h-3 w-3" /> Specialty drops</p>
              <h2 id="flavors-title" className="mt-4 font-display text-[clamp(2.4rem,1.4rem+4vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-white">
                The <span className="bw-accent normal-case text-[#9ee0b8]">line-up</span>
              </h2>
              <p className="sd-rail-lead mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/65">
                Every pop-up puts three on the board. These are the flavors that have come off the cart since July.
                <span className="hidden [@media(hover:hover)]:inline"> Hover a cup to spin it.</span>
              </p>
            </div>
            <Link href="/flavors" className="bw-btn bw-btn-ghost self-start md:self-auto">Explore every flavor <span aria-hidden>→</span></Link>
          </div>
        </div>

        <div className="sd-rail-gap mt-10 lg:pl-[max(var(--bw-pad),calc((100vw-1320px)/2+var(--bw-pad)))]">
          <ul
            ref={trackRef}
            className="sd-rail-track bw-noscrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--bw-pad)] pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 lg:px-0 lg:pr-[var(--bw-pad)] xl:grid-cols-4"
          >
            {DROPS.map((d) => (
              <Card key={d.id} d={d} active={spinning === d.id} onHover={(on) => setHovered((h) => (on ? d.id : h === d.id ? null : h))} />
            ))}
          </ul>
        </div>

        <p className="bw-shell mt-6 text-[0.8rem] text-white/40">
          Cups shown are 3D renders of the Big Wiss cup. Flavors rotate every pop-up; <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-white/60 underline underline-offset-4">follow @whatatastematcha</a> for the next drop.
        </p>
      </div>
    </section>
  );
}
