import Image from "next/image";

import { Heart } from "@/components/elevate/heart";

const STOPS = [
  { place: "Tiliani, Dearborn", when: "Evening pop-up · 14 Sep 2026", href: "https://www.instagram.com/p/DdQCQ24jX1W/" },
  { place: "Nuts Now, Dearborn Heights", when: "Weekend pop-up · 26–27 Sep 2026", href: "https://www.instagram.com/p/DduaN_oFKGj/" },
  { place: "Roots Children’s Center", when: "Trunk or Treat · sold out in the first hour", href: "https://www.instagram.com/reel/DeNp8U3CZqP/" },
];

/** Who's behind the cart, shown with his own photos. */
export function Founder() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#0a1a11,#12301f)] py-20 md:py-28">
      <div className="bw-shell grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="sd-mask relative aspect-[9/14] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <Image src="/elevate/cart-night.webp" alt="Big Wiss at his matcha cart outside Tiliani at night" fill sizes="(max-width: 1024px) 80vw, 460px" className="object-cover" />
          </div>
          <div className="sd-drift absolute -bottom-8 -right-3 w-[44%] overflow-hidden rounded-[22px] border-4 border-[#0a1a11] shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:-right-10" style={{ ["--rot" as string]: "4deg", ["--from" as string]: "18%", ["--to" as string]: "-14%", transform: "rotate(4deg)" }}>
            <div className="relative aspect-[9/16]">
              <Image src="/elevate/wiss-pouring.webp" alt="Wiss making a matcha at the cart" fill sizes="200px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="sd-rise pt-6 lg:pt-0">
          <p className="bw-kicker"><Heart className="h-3 w-3" /> Who&rsquo;s pouring</p>
          <h2 id="about-title" className="bw-h mt-4 text-[clamp(2.6rem,1.6rem+4.2vw,5rem)] text-white">
            It&rsquo;s Wiss <span className="bw-accent text-[#9ee0b8]">behind the cart.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-white/70">
            Big Wiss Matcha is Wiss&rsquo;s own cart: handcrafted matcha, a dessert flavor or three on the board, and the
            red heart on every lid. It shows up at weekend pop-ups around Dearborn, at restaurant nights, and at your event.
          </p>
          <p className="mt-4 max-w-xl text-[1.06rem] leading-relaxed text-white/70">
            His words for it: <span className="bw-accent text-[1.2em] text-[#e8d4b8]">&ldquo;great matcha and great vibes.&rdquo;</span>
          </p>

          <ul className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {STOPS.map((s) => (
              <li key={s.place}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-display text-[1.05rem] font-bold uppercase tracking-[-0.01em] text-white">{s.place}</span>
                    <span className="mt-0.5 block text-[0.85rem] text-white/55">{s.when}</span>
                  </span>
                  <span className="text-[#c4a57b] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
