import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CTA_COPY } from "@/lib/constants";

export function FinalCta() {
  return (
    <SectionContainer className="pb-20 pt-6 md:pb-24">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink px-6 py-12 text-center text-cream shadow-premium-lg sm:px-10 sm:py-16"
          data-drip-anchor="final-cta"
          data-drip-order={5}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(198,223,170,0.25),transparent_44%),radial-gradient(circle_at_79%_8%,rgba(255,179,159,0.27),transparent_44%)]" />
          <div className="pointer-events-none absolute inset-0 halftone-bg opacity-15" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-matcha-100">
              Final Call
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] sm:text-6xl">
              Bring Big Wiss Matcha
              <span className="block text-outline text-transparent">to Your Event.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-cream/80 sm:text-base">
              Let&apos;s make your event stand out with premium matcha service,
              founder-led energy, and a branded guest experience people remember.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="#book">
                <Button size="lg" className="bg-matcha-500 text-ink hover:bg-matcha-300">
                  {CTA_COPY.heroPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#media">
                <Button variant="ghost" size="lg" className="border-white/25 text-cream hover:bg-white/10">
                  See Media Wall
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
