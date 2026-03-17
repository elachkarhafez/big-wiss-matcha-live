import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink/85",
        className
      )}
    >
      {children}
    </span>
  );
}
