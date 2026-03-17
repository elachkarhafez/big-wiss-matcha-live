import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { FloatingMatchaScene } from "@/components/3d/floating-matcha-scene";
import { SectionContainer } from "@/components/layout/section-container";
import { ParallaxWrap } from "@/components/motion/parallax-wrap";
import { Reveal } from "@/components/motion/reveal";
import { ApprovedStamp } from "@/components/ui/approved-stamp";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { CTA_COPY, HERO_BADGES } from "@/lib/constants";

export function Hero() {
  return (
    <SectionContainer id="hero" className="relative overflow-hidden pt-32 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-soft" />
      <div className="pointer-events-none absolute -left-16 top-24 -z-10 h-44 w-44 rounded-full bg-matcha-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-8 -z-10 h-52 w-52 rounded-full bg-peach-300/40 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <Reveal>
          <div className="relative">
            <div className="pointer-events-none absolute -left-6 top-4 hidden overflow-hidden rounded-2xl border border-white/30 opacity-20 shadow-premium-md md:block">
              <video
                className="h-28 w-44 object-cover"
                src="/videos/matcha-pov.mp4"
                poster="/images/big-wiss-action-poster.png"
                muted
                loop
                autoPlay
                playsInline
              />
            </div>

            <p className="mb-5 inline-flex rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/80">
              Dearborn Premium Pop-Up
            </p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-ink sm:text-6xl lg:text-7xl">
              Big Energy.
              <br />
              Real Matcha.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
              Big Wiss Matcha is a founder-led pop-up built for standout events,
              premium service flow, and a social-ready experience that guests
              remember.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#book">
                <Button size="lg">
                  {CTA_COPY.heroPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#menu">
                <Button variant="ghost" size="lg">
                  Explore Menu
                </Button>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {HERO_BADGES.map((badge) => (
                <Pill key={badge}>{badge}</Pill>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ParallaxWrap strength={20}>
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="action-panel pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-matcha-100/70 via-transparent to-peach-100/70 transition-all duration-500 group-hover:from-matcha-100/90" />
              <div className="pointer-events-none absolute -inset-6 -z-20 rounded-[2.4rem] border border-ink/10" />

              <Link
                href="#book"
                className="group/pass relative block transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matcha-300"
                aria-label="Pass the Matcha and jump to booking"
              >
                <div className="pointer-events-none absolute -right-6 -top-8 -z-10 h-28 w-28 rounded-full bg-matcha-300/55 blur-2xl transition-all duration-500 group-hover/pass:scale-125 group-hover/pass:opacity-95 animate-pulse-glow" />
                <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-white/35 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream opacity-0 backdrop-blur-sm transition duration-300 group-hover/pass:opacity-100 group-focus-visible/pass:opacity-100">
                  Take a sip
                </div>
                <div className="pointer-events-none absolute right-4 top-4 z-20 h-12 w-12 rounded-full border border-white/35 bg-cream/85 p-1 shadow-premium-md transition-transform duration-400 group-hover/pass:-translate-y-1 group-hover/pass:translate-x-1">
                  <Image
                    src="/logo/big-wiss-logo.jpeg"
                    alt=""
                    width={48}
                    height={48}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>

                <div className="relative overflow-hidden rounded-[1.9rem] border border-ink/15 bg-oat shadow-premium-lg transition-all duration-500 group-hover/pass:shadow-[0_30px_85px_rgba(24,33,16,0.28)]">
                  <Image
                    src="/images/big-wiss-action-poster.png"
                    alt="Founder action poster for Big Wiss Matcha"
                    width={1150}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/pass:scale-[1.03]"
                    priority
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/35 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                    Pass the Matcha
                  </div>
                </div>
              </Link>

              <ApprovedStamp className="absolute -right-5 top-8 z-30" />

              <div className="absolute -bottom-8 -left-6 hidden w-52 rounded-2xl border border-ink/15 bg-cream/90 p-2 shadow-premium-md backdrop-blur-md md:block">
                <div className="relative overflow-hidden rounded-xl">
                  <video
                    className="h-28 w-full object-cover"
                    src="/videos/matcha-pov.mp4"
                    poster="/images/big-wiss-action-poster.png"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
                    <PlayCircle className="h-3 w-3" />
                    BTS Texture
                  </span>
                </div>
              </div>
            </div>
          </ParallaxWrap>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-12 md:mt-14">
        <FloatingMatchaScene />
      </Reveal>
    </SectionContainer>
  );
}
