"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { DROPS, IG_FOLLOWERS, IG_URL, renders } from "@/lib/drops";
import { NEXT_POPUP, popUpStatus } from "@/lib/popup";

/** Bento of the things people come for: when/where, the line-up, the cart, the feed. */
export function Highlights() {
  const p = NEXT_POPUP;
  const [status, setStatus] = useState<ReturnType<typeof popUpStatus> | null>(null);
  useEffect(() => setStatus(popUpStatus(p)), [p]);
  const flavors = p.flavors.map((id) => DROPS.find((d) => d.id === id)).filter(Boolean) as typeof DROPS;
  const label =
    !status ? "Next pop-up"
      : status.status === "today" ? "Pouring today"
      : status.status === "past" ? "Last pop-up"
      : status.daysAway <= 1 ? "Tomorrow"
      : status.daysAway <= 6 ? `In ${status.daysAway} days`
      : "Next pop-up";

  return (
    <section id="popup" aria-labelledby="popup-title" className="relative bg-[#0a1a11] py-16 md:py-24">
      <div className="bw-shell">
        <h2 className="bw-h sd-rise text-[clamp(2.4rem,1.5rem+3.6vw,4.4rem)] text-white">
          Find us. <span className="text-white/40">Book us.</span>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto] [&>*]:min-w-0">
          {/* next pop-up */}
          <article className="sd-rise col-span-2 row-span-2 flex flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#1b4430,#12301f_55%,#0f2a1c)] p-6 sm:p-8">
            <p className="bw-kicker">
              <span className={`inline-block h-2 w-2 rounded-full ${status?.status === "today" ? "animate-pulse bg-[#7dcea0]" : "bg-[#c4a57b]"}`} aria-hidden />
              {label}
            </p>
            <p id="popup-title" className="bw-h mt-4 text-[clamp(2.4rem,1.6rem+3.4vw,4.2rem)] text-white">
              {p.days.map((d) => d.label).join(" & ")}
            </p>
            <p className="mt-3 text-[1.05rem] text-white/70">From {p.starts}{p.ends ? ` – ${p.ends}` : ""} · {p.area}</p>
            {status?.status === "past" ? (
              <p className="mt-2 text-[0.92rem] text-white/55">The next date drops on Instagram first.</p>
            ) : null}
            <ul className="mt-7 grid grid-cols-3 gap-2.5" aria-label="On the board">
              {flavors.map((d) => (
                <li key={d.id} className="overflow-hidden rounded-2xl" style={{ background: d.backdrop }}>
                  <div className="relative aspect-[3/4]">
                    <Image src={renders(d.id).photoSm} alt="" fill sizes="(max-width: 768px) 30vw, 200px" className="object-cover" />
                  </div>
                  <p className="px-2 pb-2.5 text-center text-[0.74rem] font-semibold leading-tight text-[#1a1a1a]">{d.name}</p>
                </li>
              ))}
            </ul>
            <a href={p.source} target="_blank" rel="noopener noreferrer" className="mt-auto pt-7 text-[0.95rem] font-semibold text-[#9ee0b8] underline-offset-4 hover:underline">
              Address &amp; details on the post ↗
            </a>
          </article>

          {/* the cart */}
          <Link href="#book" className="group sd-rise sd-rise-2 relative col-span-2 min-h-[260px] overflow-hidden rounded-[32px]">
            <Image src="/elevate/cart-day.webp" alt="The Big Wiss matcha cart" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.04]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a1a11]/90 via-[#0a1a11]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="bw-kicker">Catering · now booking</p>
              <p className="bw-h mt-2 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] text-white">Put the cart at your party.</p>
            </div>
          </Link>

          {/* the line-up */}
          <Link href="#flavors" className="sd-rise sd-rise-3 flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#f5f3f0] p-6 text-[#12301f] transition-transform duration-500 hover:-translate-y-1">
            <p className="bw-kicker !text-[#2d5a3d]">The line-up</p>
            <p>
              <span className="bw-h block text-[clamp(4rem,3rem+4vw,6rem)]">{DROPS.length}</span>
              <span className="mt-1 block text-[0.95rem] font-semibold text-[#12301f]/70">specialty flavors since July</span>
            </p>
          </Link>

          {/* the feed */}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="sd-rise sd-rise-3 flex min-h-[200px] flex-col justify-between rounded-[32px] bg-[#c4a57b] p-6 text-[#0a1a11] transition-transform duration-500 hover:-translate-y-1">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em]">Instagram</p>
            <p>
              <span className="bw-h block text-[clamp(1.15rem,0.8rem+1.2vw,1.45rem)] [overflow-wrap:anywhere] lg:[overflow-wrap:normal]">@whatatastematcha</span>
              <span className="mt-1 flex items-center gap-1.5 text-[0.95rem] font-semibold text-[#0a1a11]/70">
                {IG_FOLLOWERS} followers <Heart className="h-3 w-3" color="#0a1a11" />
              </span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
