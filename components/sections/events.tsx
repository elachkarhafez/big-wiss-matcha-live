"use client";

import { useState } from "react";
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
        "transition-colors duration-400",
        isNight
          ? "bg-[#1b2018] text-cream"
          : "bg-cream/85 text-ink"
      )}
    >
      <Reveal>
        <SectionHeading
          eyebrow="Events & Catering"
          title="Built for High-Impact Gatherings"
          description="From intimate private celebrations to large activations, Big Wiss Matcha is available for premium event service across Dearborn and surrounding Michigan communities."
          className={cn(isNight && "[&_h2]:text-cream [&_p]:text-cream/80")}
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          variant={mode === "day" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setMode("day")}
          className={cn(
            mode === "day" ? "" : isNight && "border-cream/35 text-cream hover:bg-white/10"
          )}
        >
          <SunMedium className="h-4 w-4" />
          Day Event
        </Button>
        <Button
          variant={mode === "night" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setMode("night")}
          className={cn(
            mode === "night"
              ? "bg-peach-300 text-ink hover:bg-peach-500"
              : isNight
                ? "border-cream/35 text-cream hover:bg-white/10"
                : ""
          )}
        >
          <MoonStar className="h-4 w-4" />
          Night Event
        </Button>
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
              <Card
                className={cn(
                  "h-full border p-5",
                  isNight
                    ? "border-white/15 bg-white/5"
                    : "border-ink/10 bg-white/90"
                )}
              >
                <span
                  className={cn(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    isNight
                      ? "bg-matcha-500/25 text-matcha-100"
                      : "bg-matcha-100 text-matcha-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className={cn("text-lg font-semibold", isNight ? "text-cream" : "text-ink")}>
                  {feature.title}
                </h3>
                <p className={cn("mt-2 text-sm leading-relaxed", isNight ? "text-cream/75" : "text-ink/70")}>
                  {feature.description}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.08} className="mt-10">
        <div data-drip-anchor="events-packages" data-drip-order={3}>
          <h3
            className={cn(
              "text-xs font-bold uppercase tracking-[0.2em]",
              isNight ? "text-peach-300" : "text-matcha-700"
            )}
          >
            Package Preview
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {EVENT_PACKAGE_PREVIEWS.map((pack) => (
              <Card
                key={pack.title}
                className={cn(
                  "border p-5",
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
            ))}
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
