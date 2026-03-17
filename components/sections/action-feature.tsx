"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CTA_COPY } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ActionFeature() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionContainer className="overflow-hidden">
      <Reveal>
        <div className="action-panel relative overflow-hidden rounded-[2.1rem] border border-ink/10 bg-ink p-6 text-cream shadow-premium-lg sm:p-8 lg:p-10">
          <div className="halftone-bg pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-matcha-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-peach-500/25 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-matcha-100">
                Campaign Panel
              </p>
              <h2 className="font-display text-5xl uppercase leading-[0.88] sm:text-6xl">
                Matcha
                <span className="text-outline block text-transparent">With Presence.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
                Big Wiss is more than a drink table. It is a founder-led brand
                insert that turns service into a visual moment guests remember
                and share.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-peach-300">
                Big Wiss pulls up.
              </p>
              <Link href="#book" className="mt-7 inline-block">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-peach-300 text-ink hover:bg-peach-500"
                >
                  {CTA_COPY.heroPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <motion.div
              className="diagonal-frame relative overflow-hidden rounded-[1.6rem] border border-white/15"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 52, scale: 0.96 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.62, ease: [0.2, 0.65, 0.15, 1] }}
            >
              <Image
                src="/images/big-wiss-action-poster.png"
                alt="Big Wiss founder campaign poster"
                width={950}
                height={1280}
                className="h-[360px] w-full object-cover sm:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
