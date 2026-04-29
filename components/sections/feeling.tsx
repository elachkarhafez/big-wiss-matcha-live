"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { VIBE_CARDS } from "@/lib/constants";

export function Feeling() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative scroll-mt-24 py-10 md:py-[60px] xl:py-20 bg-gradient-to-br from-[#f5f3f0] via-[#e8d4b8]/10 to-[#f5f3f0] overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-[#2d5a3d]/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 -right-48 w-96 h-96 bg-gradient-to-br from-[#c4a57b]/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 xl:px-12 relative z-10">
        <Reveal>
          <motion.div style={{ opacity, scale }}>
            <SectionHeading
              eyebrow="What It Feels Like"
              title="The Big Wiss Vibe"
              description="Clean lift, smooth flavor, and visual presence your guests actually remember."
            />
          </motion.div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VIBE_CARDS.map((card, idx) => (
            <StaggerItem key={card.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, boxShadow: "0 20px 60px rgba(196, 165, 123, 0.2)" }}
              >
                <Card className="h-full border-2 border-[#c4a57b]/20 bg-gradient-to-br from-white/80 to-[#e8d4b8]/20 backdrop-blur-sm p-6 hover:border-[#c4a57b]/40 transition-all cursor-pointer">
                  <motion.p
                    className="text-xs font-bold uppercase tracking-[0.2em] text-[#c4a57b]"
                    animate={{
                      letterSpacing: "0.2em",
                    }}
                    whileHover={{ letterSpacing: "0.3em", color: "#2d5a3d" }}
                  >
                    Big Wiss Feel
                  </motion.p>
                  <motion.h3
                    className="mt-3 text-xl font-bold text-[#2d5a3d]"
                    whileHover={{ scale: 1.05, color: "#c4a57b" }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    className="mt-3 text-sm text-[#666] leading-relaxed"
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {card.copy}
                  </motion.p>

                  {/* Animated accent line */}
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-[#c4a57b] to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                  />
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
