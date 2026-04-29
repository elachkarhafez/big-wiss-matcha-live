"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ApprovedStamp } from "@/components/ui/approved-stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  MATCHA_LEVELS,
  MATCHA_OF_THE_WEEK,
  MENU_ITEMS
} from "@/lib/constants";
import type { MatchaLevelKey, MenuItem } from "@/types/menu";
import { cn } from "@/lib/utils";

const levelGlowClasses: Record<MatchaLevelKey, string> = {
  light: "from-matcha-100/60",
  balanced: "from-matcha-300/70",
  strong: "from-matcha-500/65"
};

function MenuCard({ item }: { item: MenuItem }) {
  const shouldReduceMotion = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [level, setLevel] = useState<MatchaLevelKey>("balanced");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const levelConfig = useMemo(
    () => MATCHA_LEVELS.find((entry) => entry.key === level) ?? MATCHA_LEVELS[1],
    [level]
  );

  const enableTilt = canHover && !shouldReduceMotion;
  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) * 2 - 1) * 5;
    const rotateX = ((y / rect.height) * 2 - 1) * -4.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const onMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      className="h-full [perspective:900px]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="group relative h-full"
        style={
          enableTilt
            ? {
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 120ms ease-out"
              }
            : undefined
        }
      >
        <Card
          className="group relative h-full border-ink/10 bg-white/85 transition duration-300 hover:shadow-premium-lg overflow-hidden"
        >
          {/* Animated background glow */}
          <motion.div
            className={cn(
              "pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-br to-transparent blur-sm",
              levelGlowClasses[level]
            )}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{ opacity: isHovered ? 0.2 : 0, x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />

          <motion.div className="p-5" animate={{ opacity: 1 }}>
            {/* Header with animated elements */}
            <motion.div className="mb-4 flex items-start justify-between gap-3">
              {item.image ? (
                <motion.div
                  className="relative h-24 w-20 overflow-hidden"
                  whileHover={{ scale: 1.08, rotate: -5 }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.name} product cup`}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
              ) : (
                <motion.span
                  className="relative h-12 w-12 overflow-hidden rounded-full border border-ink/10 bg-cream"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <Image
                    src="/logo/big-wiss-logo.jpeg"
                    alt={`${item.name} placeholder visual using Big Wiss logo`}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                </motion.span>
              )}
              <motion.div
                className="flex items-center gap-2"
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                {item.badge ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Badge className="bg-matcha-100 text-ink">{item.badge}</Badge>
                  </motion.div>
                ) : null}
                {item.approved ? (
                  <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.6 }}>
                    <ApprovedStamp compact className="h-11 w-11 text-[7px]" />
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>

            {/* Content with stagger animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-sm text-ink/70">{item.description}</p>
            </motion.div>

            {item.supportsLevel ? (
              <>
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/60">
                    Matcha Level
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {MATCHA_LEVELS.map((matchaLevel, idx) => (
                      <motion.div
                        key={matchaLevel.key}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "h-8 rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all",
                            level === matchaLevel.key
                              ? "border-matcha-500 bg-matcha-100 text-matcha-700 shadow-md"
                              : "border-ink/20 text-ink/70"
                          )}
                          onClick={() => setLevel(matchaLevel.key)}
                        >
                          {matchaLevel.label}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    className="mt-2 text-xs text-ink/65"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {levelConfig.intensity}
                  </motion.p>
                </div>
              </>
            ) : (
              <p className="mt-4 text-xs text-ink/60">
                Espresso blend profile with fixed intensity.
              </p>
            )}

            {item.price ? (
              <motion.p
                className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-matcha-700"
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                Starting {item.price}
              </motion.p>
            ) : null}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function Menu() {
  const [spotlightHovered, setSpotlightHovered] = useState(false);

  return (
    <SectionContainer id="menu">
      <Reveal>
        <SectionHeading
          eyebrow="Featured Menu"
          title="Premium Matcha Lineup"
          description="Designed for easy event flow and high replay value. Every pour is clean, balanced, and built to keep people coming back."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-8">
        <motion.div
          onMouseEnter={() => setSpotlightHovered(true)}
          onMouseLeave={() => setSpotlightHovered(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card
            className="relative overflow-hidden border-ink/12 bg-ink p-6 text-cream"
            data-drip-anchor="menu-spotlight"
            data-drip-order={2}
          >
            {/* Animated background gradients */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(198,223,170,0.3),transparent_42%),radial-gradient(circle_at_80%_4%,rgba(255,179,159,0.32),transparent_46%)]"
              animate={{ opacity: spotlightHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />

            {/* Floating light effect */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{
                background: spotlightHovered
                  ? "radial-gradient(circle at 50% 50%, rgba(198,223,170,0.2) 0%, transparent 70%)"
                  : "radial-gradient(circle at 50% 50%, rgba(198,223,170,0.05) 0%, transparent 70%)",
              }}
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className="relative z-10 flex flex-wrap items-center justify-between gap-4"
              animate={{ y: spotlightHovered ? -5 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-matcha-100">
                  {MATCHA_OF_THE_WEEK.badge}
                </p>
                <h3 className="mt-2 font-display text-4xl uppercase leading-none">
                  <motion.span
                    animate={{ opacity: spotlightHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {MATCHA_OF_THE_WEEK.title}
                  </motion.span>
                </h3>
                <p className="mt-2 max-w-xl text-sm text-cream/80">
                  {MATCHA_OF_THE_WEEK.description}
                </p>
              </motion.div>

              <motion.div
                animate={{ rotate: spotlightHovered ? 360 : 0, scale: spotlightHovered ? 1.1 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <ApprovedStamp className="border-cream/65 bg-cream/90 text-matcha-700" />
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </Reveal>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MENU_ITEMS.map((item) => (
          <StaggerItem key={item.name}>
            <MenuCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </SectionContainer>
  );
}
