"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CTA_COPY } from "@/lib/constants";

export function FinalCta() {
  const [hovered, setHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer className="pb-20 pt-6 md:pb-24">
      <Reveal>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border-2 border-[#c4a57b]/50 bg-gradient-to-br from-[#2d5a3d]/95 via-[#1f3e2a]/90 to-[#1a1a1a]/95 px-6 py-16 text-center text-white shadow-2xl sm:px-10 sm:py-20 cursor-pointer"
          data-drip-anchor="final-cta"
          data-drip-order={5}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.02, y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Animated gradient backgrounds */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(196,165,123,0.3),transparent_44%),radial-gradient(circle_at_79%_8%,rgba(212,232,208,0.2),transparent_44%)]"
            animate={{ opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated halftone background */}
          <motion.div
            className="pointer-events-none absolute inset-0 halftone-bg opacity-10"
            animate={{ opacity: hovered ? 0.2 : 0.1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating light effect */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background: hovered
                ? "radial-gradient(circle at 50% 50%, rgba(196,165,123,0.2) 0%, transparent 70%)"
                : "radial-gradient(circle at 50% 50%, rgba(196,165,123,0.05) 0%, transparent 70%)",
            }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="relative z-10 mx-auto max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-[0.18em] text-matcha-100"
              animate={{ letterSpacing: hovered ? "0.25em" : "0.18em" }}
            >
              Final Call
            </motion.p>

            {/* Main heading */}
            <motion.h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] sm:text-6xl">
              <motion.span
                variants={itemVariants}
                className="inline-block"
                animate={{ opacity: hovered ? 1 : 0.9 }}
              >
                Bring Big Wiss Matcha
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block text-outline text-transparent"
                animate={{ opacity: hovered ? 1 : 0.8 }}
              >
                to Your Event.
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-2xl text-sm text-cream/80 sm:text-base"
            >
              Let&apos;s make your event stand out with premium matcha service,
              founder-led energy, and a branded guest experience people remember.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link href="#book">
                  <Button
                    size="lg"
                    className="bg-[#c4a57b] text-[#1a1a1a] hover:bg-[#e8d4b8] hover:text-[#1a1a1a] relative overflow-hidden group font-bold uppercase tracking-wider"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                      animate={{ x: hovered ? "100%" : "-100%" }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      group-hover={{ opacity: 0.3 }}
                    />
                    <span className="relative flex items-center gap-2">
                      {CTA_COPY.heroPrimary}
                      <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link href="#media">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="border-2 border-[#c4a57b]/60 text-[#c4a57b] hover:bg-[#c4a57b]/15 hover:border-[#c4a57b] transition-all uppercase tracking-wider font-semibold"
                  >
                    See Media Wall
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Reveal>
    </SectionContainer>
  );
}
