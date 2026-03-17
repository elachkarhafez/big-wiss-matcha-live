import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { VIBE_CARDS } from "@/lib/constants";

export function Feeling() {
  return (
    <SectionContainer>
      <Reveal>
        <SectionHeading
          eyebrow="What It Feels Like"
          title="The Big Wiss Vibe"
          description="Clean lift, smooth flavor, and visual presence your guests actually remember."
        />
      </Reveal>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VIBE_CARDS.map((card) => (
          <StaggerItem key={card.title}>
            <Card className="h-full border-ink/10 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-matcha-700">
                Big Wiss Feel
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{card.copy}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionContainer>
  );
}
