import { Heart } from "@/components/elevate/heart";

const QUOTE = "hands down the best matcha I ever had";

/** One verified quote, credited exactly as the source shows it. Words light up as it scrolls through. */
export function Proof() {
  return (
    <section aria-label="What people say" className="relative bg-[#12301f] py-24 md:py-36">
      <div className="bw-shell text-center">
        <Heart className="mx-auto h-6 w-6" />
        <blockquote className="mx-auto mt-6 max-w-4xl">
          <p className="bw-accent text-[clamp(2.1rem,1.1rem+4.2vw,4.8rem)] leading-[1.06] text-white">
            {QUOTE.split(" ").map((w, i) => (
              <span key={i} className="sd-word inline-block" style={{ ["--i" as string]: i }}>
                {i === 0 ? "“" : ""}{w}{i === QUOTE.split(" ").length - 1 ? "”" : ""}&nbsp;
              </span>
            ))}
          </p>
          <footer className="mt-6 text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[#c4a57b]">
            <a href="https://www.instagram.com/reel/DbjpggVR3n7/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              @thehalalfoodguru · 2 Aug 2026
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
