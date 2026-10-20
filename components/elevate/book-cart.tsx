import Image from "next/image";
import Link from "next/link";

import { Heart } from "@/components/elevate/heart";
import { IG_URL } from "@/lib/drops";

// Event types named in the 27 Sep 2026 "now booking" post, plus community events (Roots, Oct 2026).
const EVENTS = ["Showers", "Weddings", "Birthdays", "Parties", "Community events"];

const STEPS = [
  { n: "01", t: "Tell us about it", d: "Date, guest count and venue, through the booking form or a DM." },
  { n: "02", t: "Set the menu", d: "Choose the matcha strength and serving style in the form." },
  { n: "03", t: "The cart shows up", d: "Wiss and the cart, pouring for your guests." },
];

export function BookCart() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--bw-cream)" }}>
      <div className="bw-shell grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="bw-kicker !text-[#2d5a3d]"><Heart className="h-3 w-3" /> Catering</p>
          <h2 id="book-title" className="mt-4 font-display text-[clamp(2.4rem,1.4rem+4vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-[#12301f]">
            Put the cart <span className="bw-accent normal-case text-[#2d5a3d]">at your party</span>
          </h2>
          <p className="mt-5 max-w-xl text-[1.06rem] leading-relaxed text-[#1a1a1a]/70">
            &ldquo;Whether an event big or small, our Matcha cart is here to be the cherry on top of your event!&rdquo; Now booking.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Events we cater">
            {EVENTS.map((e) => (
              <li key={e} className="rounded-full border border-[#2d5a3d]/25 bg-white px-4 py-2 text-[0.85rem] font-semibold text-[#12301f]">{e}</li>
            ))}
          </ul>

          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t-2 border-[#2d5a3d] pt-4">
                <span className="font-display text-[0.8rem] font-bold tracking-[0.18em] text-[#c4a57b]">{s.n}</span>
                <p className="mt-1 font-display text-[1.05rem] font-bold uppercase text-[#12301f]">{s.t}</p>
                <p className="mt-1.5 text-[0.9rem] leading-snug text-[#1a1a1a]/65">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/catering" className="bw-btn" style={{ background: "#12301f", color: "#f5f3f0" }}>
              Start your booking <Heart className="h-3.5 w-3.5" />
            </Link>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="bw-btn border border-[#12301f]/25 text-[#12301f]">
              DM @whatatastematcha
            </a>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[520px] grid-cols-2 gap-4">
          <div className="relative mt-10 aspect-[9/16] -rotate-[3deg] overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(18,48,31,0.25)]">
            <Image src="/elevate/cart-day.webp" alt="The Big Wiss matcha cart set up outdoors" fill sizes="(max-width: 1024px) 45vw, 250px" className="object-cover" />
          </div>
          <div className="relative aspect-[9/16] rotate-[3deg] overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(18,48,31,0.25)]">
            <Image src="/elevate/cup-in-hand.webp" alt="A Big Wiss matcha held up, What A Taste printed on the cup" fill sizes="(max-width: 1024px) 45vw, 250px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
