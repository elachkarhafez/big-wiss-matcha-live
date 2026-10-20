import Image from "next/image";
import Link from "next/link";

import { Heart } from "@/components/elevate/heart";
import { DROPS, IG_URL, renders } from "@/lib/drops";
import { NEXT_POPUP } from "@/lib/popup";

/** The full line-up as big product cards, each on its own colour. Server-rendered. */
export function FlavorLineup() {
  return (
    <section id="flavors" aria-labelledby="flavors-title" className="relative bg-[#0a1a11] py-20 md:py-28">
      <div className="bw-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="bw-kicker"><Heart className="h-3 w-3" /> Specialty drops</p>
            <h2 id="flavors-title" className="mt-4 font-display text-[clamp(2.4rem,1.4rem+4vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-white">
              The <span className="bw-accent normal-case text-[#9ee0b8]">line-up</span>
            </h2>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/65">
              Every pop-up puts three on the board. These are the flavors that have come off the cart since July.
            </p>
          </div>
          <Link href="/flavors" className="bw-btn bw-btn-ghost self-start md:self-auto">Explore every flavor <span aria-hidden>→</span></Link>
        </div>

        <ul className="bw-noscrollbar -mx-[var(--bw-pad)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--bw-pad)] pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4">
          {DROPS.map((d) => {
            const live = NEXT_POPUP.flavors.includes(d.id);
            return (
              <li key={d.id} className="w-[78vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px]" style={{ background: d.backdrop }}>
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={renders(d.id).still}
                      alt={`${d.name} matcha in the Big Wiss cup (3D render)`}
                      fill
                      sizes="(max-width: 768px) 78vw, (max-width: 1280px) 33vw, 300px"
                      className="object-contain px-6 pt-6 transition-transform duration-500 [transition-timing-function:var(--bw-ease)] group-hover:-translate-y-2 group-hover:scale-[1.03]"
                    />
                    {live ? (
                      <span className="absolute left-4 top-4 rounded-full bg-[#0a1a11] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#9ee0b8]">This weekend</span>
                    ) : null}
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
          })}
        </ul>
        <p className="mt-6 text-[0.8rem] text-white/40">
          Cups shown are 3D renders of the Big Wiss cup. Flavors rotate every pop-up; <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-white/60 underline underline-offset-4">follow @whatatastematcha</a> for the next drop.
        </p>
      </div>
    </section>
  );
}
