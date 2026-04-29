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

const FEATURE_CUPS = [
  { src: "/product-cups/classic-matcha.png", alt: "Classic Matcha", label: "Classic" },
  { src: "/product-cups/strawberry-matcha.png", alt: "Strawberry Matcha", label: "Strawberry" },
  { src: "/product-cups/cream-top.png", alt: "Cream Top", label: "Cream Top" },
];

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

            {/* Cup composition instead of comic poster */}
            <motion.div
              className="relative overflow-hidden rounded-[1.6rem] border border-white/10"
              style={{
                background: "linear-gradient(145deg, #1a4d2e 0%, #0f2a1b 60%, #0d2317 100%)",
              }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 52, scale: 0.96 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.62, ease: [0.2, 0.65, 0.15, 1] }}
            >
              <div className="relative h-[360px] sm:h-[420px] flex items-end justify-center px-4 pb-0 overflow-hidden">
                {/* Glow behind cups */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center bottom, rgba(125, 206, 160, 0.15) 0%, transparent 70%)",
                  }}
                />

                {/* Matcha text watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <p className="font-display text-[120px] font-bold uppercase text-white/[0.03] leading-none tracking-tighter whitespace-nowrap">
                    BIG WISS
                  </p>
                </div>

                {/* 3 cups composition */}
                {FEATURE_CUPS.map((cup, i) => {
                  const positions = [
                    { left: "10%", zIndex: 2, scale: 0.9, rotate: -8 },
                    { left: "50%", zIndex: 3, scale: 1.05, rotate: 0, translateX: "-50%" },
                    { left: "auto", right: "10%", zIndex: 2, scale: 0.9, rotate: 8 },
                  ];
                  const pos = positions[i];

                  return (
                    <motion.div
                      key={cup.src}
                      className="absolute bottom-0"
                      style={{
                        left: pos.left,
                        right: (pos as any).right || "auto",
                        zIndex: pos.zIndex,
                        transform: `scale(${pos.scale}) rotate(${pos.rotate}deg) ${pos.translateX ? `translateX(${pos.translateX})` : ""}`,
                      }}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    >
                      <div className="relative w-32 h-[320px] sm:w-36 sm:h-[370px]">
                        <Image
                          src={cup.src}
                          alt={cup.alt}
                          fill
                          className="object-contain"
                          style={{
                            filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.5))",
                          }}
                          quality={90}
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d2317] to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
