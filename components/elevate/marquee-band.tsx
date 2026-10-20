import { Heart } from "@/components/elevate/heart";
import { DROPS } from "@/lib/drops";

// Phrases are Wiss's own words from @whatatastematcha captions.
const VOICE = ["What a taste", "Great matcha, great vibes", "Now booking", "One matcha at a time", "Handcrafted in Dearborn"];

function Row({ items, dir, dur, className }: { items: string[]; dir?: "rev"; dur: string; className: string }) {
  const run = [...items, ...items]; // doubled so a -50% loop is seamless
  return (
    <div className="bw-marquee-wrap overflow-hidden">
      <div className="bw-marquee" data-dir={dir} style={{ ["--dur" as string]: dur }}>
        {run.map((t, i) => (
          <span key={i} className={`flex shrink-0 items-center ${className}`} aria-hidden={i >= items.length}>
            {t}
            <Heart className="mx-[0.55em] h-[0.42em] w-[0.42em] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <section aria-label="Big Wiss Matcha" className="relative overflow-hidden border-y border-white/10 bg-[#0a1a11] py-7 md:py-9">
      <Row items={VOICE} dur="44s" className="font-display text-[clamp(2.2rem,1.4rem+3.4vw,4.6rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-white" />
      <Row items={DROPS.map((d) => d.name)} dir="rev" dur="52s" className="bw-accent mt-3 text-[clamp(1.6rem,1.1rem+2vw,3rem)] leading-none text-[#c4a57b]" />
    </section>
  );
}
