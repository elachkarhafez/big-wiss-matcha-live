import { PlayCircle } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT_BADGES } from "@/lib/constants";

export function About() {
  return (
    <SectionContainer id="about" className="bg-oat/45">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="About Big Wiss"
            title="Founder-Led Matcha With Presence"
            description="Big Wiss Matcha is a premium pop-up concept built in Dearborn for events that need real energy, sharp presentation, and drinks people post before they finish."
          />

          <p className="mt-4 font-display text-4xl uppercase leading-none text-matcha-700 sm:text-5xl">
            From Dearborn.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/75 sm:text-base">
            We combine clean flavor profiles, polished service, and creator-led
            storytelling. From guest experience to social impact, every detail is
            designed to feel memorable and elevated.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {ABOUT_BADGES.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="action-panel p-3">
            <div className="relative overflow-hidden rounded-2xl">
              <video
                className="h-[260px] w-full object-cover"
                src="/videos/matcha-pov.mp4"
                poster="/images/big-wiss-action-poster.png"
                muted
                autoPlay
                loop
                playsInline
                aria-label="Big Wiss Matcha behind-the-scenes clip"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream">
                <PlayCircle className="h-3.5 w-3.5" />
                Founder POV
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
