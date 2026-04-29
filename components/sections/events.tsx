"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  LayoutGrid,
  MoonStar,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium
} from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  EVENT_PACKAGE_PREVIEWS,
  EVENT_TYPES,
  SERVICE_QUALITIES
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons = {
  "layout-grid": LayoutGrid,
  sparkles: Sparkles,
  camera: Camera,
  shield: ShieldCheck,
  "refresh-cw": RefreshCw,
  star: Star
} as const;

type EventMode = "day" | "night";

export function Events() {
  const [mode, setMode] = useState<EventMode>("day");
  const isNight = mode === "night";

  return (
    <SectionContainer
      id="events"
      className={cn(
        "transition-colors duration-400 relative overflow-hidden",
        isNight
          ? "bg-gradient-to-br from-[#1a1a1a] to-[#2d5a3d]/20 text-cream"
          : "bg-gradient-to-b from-[#f5f3f0] to-[#e8d4b8]/10 text-ink"
      )}
    >
      {/* Animated background */}
      <motion.div
        className={cn(
          "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none",
          isNight
            ? "bg-gradient-to-br from-[#c4a57b]/10 to-transparent"
            : "bg-gradient-to-br from-[#c4a57b]/15 to-transparent"
        )}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none",
          isNight
            ? "bg-gradient-to-tr from-[#2d5a3d]/10 to-transparent"
            : "bg-gradient-to-tr from-[#2d5a3d]/10 to-transparent"
        )}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Events & Catering"
            title="Built for High-Impact Gatherings"
            description="From intimate private celebrations to large activations, Big Wiss Matcha is available for premium event service across Dearborn and surrounding Michigan communities."
            className={cn(isNight && "[&_h2]:text-cream [&_p]:text-cream/80")}
          />
        </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={mode === "day" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setMode("day")}
            className={cn(
              "transition-all duration-300",
              mode === "day" ? "" : isNight && "border-cream/35 text-cream hover:bg-white/10"
            )}
          >
            <motion.span animate={{ rotate: mode === "day" ? 0 : -90 }} transition={{ duration: 0.3 }}>
              <SunMedium className="h-4 w-4" />
            </motion.span>
            Day Event
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={mode === "night" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setMode("night")}
            className={cn(
              "transition-all duration-300",
              mode === "night"
                ? "bg-peach-300 text-ink hover:bg-peach-500"
                : isNight
                  ? "border-cream/35 text-cream hover:bg-white/10"
                  : ""
            )}
          >
            <motion.span animate={{ rotate: mode === "night" ? 0 : 90 }} transition={{ duration: 0.3 }}>
              <MoonStar className="h-4 w-4" />
            </motion.span>
            Night Event
          </Button>
        </motion.div>
      </Reveal>

      <Reveal delay={0.06} className="mt-6 flex flex-wrap gap-2">
        {EVENT_TYPES.map((eventType) => (
          <Pill
            key={eventType}
            className={cn(
              isNight
                ? "border-cream/30 bg-white/5 text-cream/85"
                : "border-ink/15 bg-white text-ink/85"
            )}
          >
            {eventType}
          </Pill>
        ))}
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_QUALITIES.map((feature) => {
          const Icon = icons[feature.icon as keyof typeof icons] ?? Star;

          return (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -8, boxShadow: isNight ? "0 10px 30px rgba(198, 223, 170, 0.2)" : "0 10px 30px rgba(45, 90, 61, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card
                  className={cn(
                    "h-full border p-5 transition-all cursor-pointer",
                    isNight
                      ? "border-white/15 bg-white/5"
                      : "border-ink/10 bg-white/90"
                  )}
                >
                  <motion.span
                    className={cn(
                      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                      isNight
                        ? "bg-matcha-500/25 text-matcha-100"
                        : "bg-matcha-100 text-matcha-700"
                    )}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <h3 className={cn("text-lg font-semibold", isNight ? "text-cream" : "text-ink")}>
                    {feature.title}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", isNight ? "text-cream/75" : "text-ink/70")}>
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.08} className="mt-10">
        <motion.div
          data-drip-anchor="events-packages"
          data-drip-order={3}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className={cn(
              "text-xs font-bold uppercase tracking-[0.2em]",
              isNight ? "text-peach-300" : "text-matcha-700"
            )}
            animate={{ letterSpacing: "0.2em" }}
            whileHover={{ letterSpacing: "0.3em" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Package Preview
          </motion.h3>
          <motion.div
            className="mt-4 grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {EVENT_PACKAGE_PREVIEWS.map((pack, idx) => (
              <motion.div
                key={pack.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card
                  className={cn(
                    "border p-5 transition-all cursor-pointer",
                    isNight
                      ? "border-white/15 bg-white/5"
                      : "border-ink/10 bg-white/90"
                  )}
                >
                  <h4 className={cn("text-lg font-semibold", isNight ? "text-cream" : "text-ink")}>
                    {pack.title}
                  </h4>
                  <p className={cn("mt-2 text-sm", isNight ? "text-cream/75" : "text-ink/70")}>
                    {pack.summary}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-xs font-semibold uppercase tracking-[0.12em]",
                      isNight ? "text-matcha-100" : "text-matcha-700"
                    )}
                  >
                    {pack.includes}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Reveal>
      </div>
    </SectionContainer>
  );
}
