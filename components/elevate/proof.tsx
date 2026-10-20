import { Heart } from "@/components/elevate/heart";

/** One verified quote, credited exactly as the source shows it. */
export function Proof() {
  return (
    <section aria-label="What people say" className="relative bg-[#12301f] py-20 md:py-24">
      <div className="bw-shell text-center">
        <Heart className="mx-auto h-6 w-6" />
        <blockquote className="mx-auto mt-6 max-w-4xl">
          <p className="bw-accent text-[clamp(1.9rem,1.1rem+3.4vw,3.8rem)] leading-[1.08] text-white">
            &ldquo;hands down the best matcha I ever had&rdquo;
          </p>
          <footer className="mt-6 text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[#c4a57b]">
            <a href="https://www.instagram.com/reel/DbjpggVR3n7/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              @thehalalfoodguru · 2 Aug 2026 ↗
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
