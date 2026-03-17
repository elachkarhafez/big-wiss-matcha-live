import { MapPin, Navigation, Phone } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { LOCATION_DETAILS } from "@/lib/constants";

export function Location() {
  return (
    <SectionContainer id="location">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Location"
            title="Dearborn Operating Base"
            description="Big Wiss Matcha operates from Dearborn and serves events across Southeast Michigan with a mobile, founder-led setup."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-ink">{LOCATION_DETAILS.name}</h3>
            <div className="mt-4 space-y-3 text-sm text-ink/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-matcha-700" />
                <span>
                  {LOCATION_DETAILS.addressLine1}
                  <br />
                  {LOCATION_DETAILS.addressLine2}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-matcha-700" />
                <a
                  href={`tel:+${LOCATION_DETAILS.phoneHref}`}
                  className="font-semibold text-ink hover:text-matcha-700"
                >
                  {LOCATION_DETAILS.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:+${LOCATION_DETAILS.phoneHref}`}>
                <Button variant="secondary">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
              <a
                href={LOCATION_DETAILS.mapHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button variant="ghost">
                  <Navigation className="h-4 w-4" />
                  Open Map
                </Button>
              </a>
            </div>
          </Card>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
