"use client";

import { PlayCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT_BADGES } from "@/lib/constants";

export function About() {
  const [videoHovered, setVideoHovered] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const videoScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const videoRotate = useTransform(scrollYProgress, [0, 0.5], [10, 0]);

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative scroll-mt-24 py-10 md:py-[60px] xl:py-20 bg-gradient-to-b from-[#f5f3f0] to-[#e8d4b8]/20 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 xl:px-12">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#c4a57b]/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_0.88fr] lg:items-center relative z-10">
        <Reveal>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ opacity: textOpacity, y: textY }}
          >
            <SectionHeading
              eyebrow="About Big Wiss"
              title="Founder-Led Matcha With Presence"
              description="Big Wiss Matcha is a premium pop-up concept built in Dearborn for events that need real energy, sharp presentation, and drinks people post before they finish."
            />

            <motion.p
              variants={itemVariants}
              className="mt-6 font-display text-4xl uppercase leading-none text-[#2d5a3d] sm:text-5xl"
              whileHover={{ scale: 1.05, color: "#c4a57b" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              From Dearborn.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#666] font-light"
            >
              We combine clean flavor profiles, polished service, and creator-led
              storytelling. From guest experience to social impact, every detail is
              designed to feel memorable and elevated.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {ABOUT_BADGES.map((badge, idx) => (
                <motion.div
                  key={badge}
                  variants={itemVariants}
                  whileHover={{ scale: 1.12, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Badge className="bg-[#c4a57b]/15 text-[#2d5a3d] border border-[#c4a57b]/30 cursor-pointer hover:bg-[#c4a57b]/25 hover:shadow-lg transition-all">
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onMouseEnter={() => setVideoHovered(true)}
            onMouseLeave={() => setVideoHovered(false)}
            style={{ scale: videoScale, rotate: videoRotate }}
          >
            <Card className="action-panel p-3 shadow-2xl border-2 border-[#c4a57b]/20">
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                animate={{
                  boxShadow: videoHovered
                    ? "0 30px 80px rgba(196, 165, 123, 0.4)"
                    : "0 10px 40px rgba(196, 165, 123, 0.1)",
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.video
                  className="h-[300px] w-full object-cover"
                  src="/videos/matcha-pov.mp4"
                  poster="/images/big-wiss-action-poster.png"
                  muted
                  autoPlay
                  loop
                  playsInline
                  aria-label="Big Wiss Matcha behind-the-scenes clip"
                  animate={{ scale: videoHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-transparent"
                  animate={{ opacity: videoHovered ? 0.7 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Play indicator with glow */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: videoHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ scale: videoHovered ? 1 : 0.7, rotate: videoHovered ? 0 : -90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow: videoHovered
                          ? "0 0 60px rgba(196, 165, 123, 0.8)"
                          : "0 0 20px rgba(196, 165, 123, 0.4)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <PlayCircle className="h-20 w-20 text-[#c4a57b]" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Animated badge */}
                <motion.div
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2d5a3d]/80 to-[#1f3e2a]/80 backdrop-blur-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-[#c4a57b]/40"
                  animate={{
                    y: videoHovered ? -8 : 0,
                    scale: videoHovered ? 1.1 : 1,
                    boxShadow: videoHovered
                      ? "0 0 30px rgba(196, 165, 123, 0.5)"
                      : "0 0 10px rgba(196, 165, 123, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div animate={{ rotate: videoHovered ? 360 : 0 }} transition={{ duration: 0.6 }}>
                    <PlayCircle className="h-4 w-4" />
                  </motion.div>
                  Founder POV
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
