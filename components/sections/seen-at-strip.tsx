import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { SEEN_AT_ITEMS } from "@/lib/constants";

export function SeenAtStrip() {
  const items = [...SEEN_AT_ITEMS, ...SEEN_AT_ITEMS];

  return (
    <SectionContainer className="py-8">
      <Reveal>
        <div className="rounded-2xl border border-ink/10 bg-white/75 px-3 py-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 px-2">
            <span className="h-2 w-2 rounded-full bg-matcha-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/70">
              Seen At
            </p>
          </div>
          <div className="overflow-hidden">
            <ul className="seen-at-track flex min-w-max items-center gap-3">
              {items.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-full border border-ink/15 bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
