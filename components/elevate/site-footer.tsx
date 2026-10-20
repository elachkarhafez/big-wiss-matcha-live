import Image from "next/image";
import Link from "next/link";

import { Heart } from "@/components/elevate/heart";
import { IG_URL } from "@/lib/drops";

// Address and phone are deliberately absent: both are an open question with the owner.
export function SiteFooter() {
  return (
    <footer className="relative bg-[#0a1a11] pb-10 pt-20">
      <div className="bw-shell">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-[110px] w-[150px]">
            <Image src="/logo/logo-v2.webp" alt="Big Wiss Matcha" fill sizes="150px" className="object-contain" />
          </div>
          <p className="mt-6 font-display text-[clamp(2.2rem,1.4rem+3.6vw,4.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-white">
            What a <span className="bw-accent normal-case text-[#9ee0b8]">taste</span>
            <Heart className="ml-2 inline-block h-[0.42em] w-[0.42em] align-[0.12em]" />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catering" className="bw-btn bw-btn-gold">Book the cart</Link>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="bw-btn bw-btn-ghost">@whatatastematcha</a>
          </div>
        </div>

        <div className="bw-rule mt-16" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[0.8rem] text-white/45 md:flex-row">
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/flavors" className="hover:text-white">Flavors</Link>
            <a href="/#popup" className="hover:text-white">Next pop-up</a>
            <Link href="/catering" className="hover:text-white">Catering</Link>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href="https://www.instagram.com/big_wissss/" target="_blank" rel="noopener noreferrer" className="hover:text-white">@big_wissss</a>
          </nav>
          <p>&copy; {new Date().getFullYear()} Big Wiss Matcha · Dearborn, MI</p>
        </div>
      </div>
    </footer>
  );
}
