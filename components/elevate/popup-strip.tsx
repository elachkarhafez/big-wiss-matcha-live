"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Heart } from "@/components/elevate/heart";
import { DROPS, renders } from "@/lib/drops";
import { NEXT_POPUP, popUpStatus } from "@/lib/popup";

/** "Where are you this weekend?" in one glance. Status is computed in the visitor's browser. */
export function PopUpStrip() {
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
    <section id="popup" aria-labelledby="popup-title" className="relative bg-[#0a1a11] py-16 md:py-20">
      <div className="bw-shell">
        <div className="sd-rise grid items-center gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#12301f,#0d2418)] p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <p className="bw-kicker">
              <span className={`inline-block h-2 w-2 rounded-full ${status?.status === "today" ? "animate-pulse bg-[#7dcea0]" : "bg-[#c4a57b]"}`} aria-hidden />
              {label}
            </p>
            <h2 id="popup-title" className="mt-4 font-display text-[clamp(2rem,1.2rem+3vw,3.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-white">
              {p.days.map((d) => d.label).join(" & ")}
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.95rem] sm:max-w-md">
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45">From</dt>
                <dd className="mt-1 font-semibold text-white">{p.starts}{p.ends ? ` – ${p.ends}` : ""}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/45">Where</dt>
                <dd className="mt-1 font-semibold text-white">{p.area}</dd>
              </div>
            </dl>
            {status?.status === "past" ? (
              <p className="mt-5 max-w-md text-[0.92rem] text-white/60">The next date drops on Instagram first. Follow along so you don&rsquo;t miss it.</p>
            ) : null}
            <a
              href={p.source}
              target="_blank"
              rel="noopener noreferrer"
              className="bw-btn bw-btn-ghost mt-7"
            >
              Address &amp; details on the post
            </a>
            <p className="mt-3 text-[0.75rem] text-white/40">Announced {p.posted}</p>
          </div>

          <div>
            <p className="mb-4 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#c4a57b]">
              <Heart className="h-3 w-3" /> On the board
            </p>
            <ul className="grid grid-cols-3 gap-3">
              {flavors.map((d) => (
                <li key={d.id} className="overflow-hidden rounded-2xl" style={{ background: d.backdrop }}>
                  <div className="relative aspect-[3/4]">
                    <Image src={renders(d.id).photoSm} alt="" fill sizes="(max-width: 768px) 30vw, 180px" className="object-cover" />
                  </div>
                  <p className="px-2.5 pb-3 text-center text-[0.78rem] font-semibold leading-tight text-[#1a1a1a]">{d.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
