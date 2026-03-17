import { cn } from "@/lib/utils";

type ApprovedStampProps = {
  className?: string;
  compact?: boolean;
};

export function ApprovedStamp({ className, compact = false }: ApprovedStampProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-matcha-500/60 bg-cream/95 font-bold uppercase tracking-[0.14em] text-matcha-700 shadow-[0_6px_20px_rgba(84,117,67,0.26)]",
        compact ? "h-16 w-16 text-[8px]" : "h-20 w-20 text-[9px]",
        className
      )}
      aria-label="Big Wiss Approved"
    >
      <span className="text-center leading-tight">
        Big Wiss
        <br />
        Approved
      </span>
    </span>
  );
}
