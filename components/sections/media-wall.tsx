"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  MEDIA_EXPANSION_CATEGORIES,
  MEDIA_ITEMS,
  REACTION_WALL_PLACEHOLDERS
} from "@/lib/constants";

type MediaCardProps = {
  label: string;
  src: string;
  poster: string;
  onOpen: () => void;
};

function MediaCard({ label, src, poster, onOpen }: MediaCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const element = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void element.play().catch(() => {});
          } else {
            element.pause();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative h-[280px] w-full overflow-hidden rounded-2xl border border-ink/12 bg-ink text-left shadow-premium-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matcha-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      aria-label={`Open ${label} media`}
    >
      {hasError ? (
        <Image
          src={poster}
          alt={`${label} still`}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="metadata"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-25" />

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className="rounded-full border border-white/35 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream">
          {label}
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/45 text-cream">
          <Play className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}

export function MediaWall() {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const activeMedia = activeMediaIndex !== null ? MEDIA_ITEMS[activeMediaIndex] : null;
  const povRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: povRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [16, -14]);

  return (
    <SectionContainer id="media">
      <Reveal>
        <SectionHeading
          eyebrow="Media Wall"
          title="A Brand Built to Be Seen"
          description="Short-form friendly visuals, high-energy service moments, and campaign-ready details. Add new clips later by extending the media constants."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <motion.div ref={povRef} style={{ y }} className="mt-8">
          <Card className="overflow-hidden border-ink/12 bg-ink">
            <div className="grid items-stretch gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <button
                type="button"
                onClick={() => setActiveMediaIndex(0)}
                className="group relative h-[320px] overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matcha-300"
              >
                <video
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
                  src="/videos/matcha-pov.mp4"
                  poster="/images/big-wiss-action-poster.png"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-black/40 transition-opacity duration-300 group-hover:opacity-25" />
              </button>
              <div className="p-6 text-cream sm:p-8">
                <Badge className="bg-peach-300 text-ink">Featured POV</Badge>
                <h3 className="mt-4 font-display text-4xl uppercase leading-[0.9]">
                  This is what your
                  <span className="block text-outline text-transparent">guests see.</span>
                </h3>
                <p className="mt-4 text-sm text-cream/80">
                  Fast-paced service, premium visual flow, and moments that land
                  on camera naturally without forcing it.
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-matcha-100">
                  POV Scroll Moment
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {MEDIA_ITEMS.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.06}>
            <MediaCard
              label={item.label}
              src={item.src}
              poster={item.poster}
              onOpen={() => setActiveMediaIndex(index)}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.06} className="mt-8">
        <Card className="border-ink/10 bg-white/85 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-matcha-700">
            Reaction Wall Ready
          </p>
          <p className="mt-2 text-sm text-ink/70">
            Structure is in place to expand this wall with first-sip reactions,
            guest clips, and live event testimonials.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {REACTION_WALL_PLACEHOLDERS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-ink/12 bg-cream/70 p-4"
              >
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-xs text-ink/65">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {MEDIA_EXPANSION_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full border border-ink/15 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/75"
              >
                {category}
              </span>
            ))}
          </div>
        </Card>
      </Reveal>

      <Modal
        open={activeMedia !== null}
        title={activeMedia?.title ?? "Media"}
        onClose={() => setActiveMediaIndex(null)}
      >
        {activeMedia ? (
          <video
            className="h-auto w-full max-h-[78vh] object-contain"
            src={activeMedia.src}
            poster={activeMedia.poster}
            controls
            autoPlay
            playsInline
          />
        ) : null}
      </Modal>
    </SectionContainer>
  );
}
