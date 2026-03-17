import { cn } from "@/lib/utils";

type LiquidDividerProps = {
  className?: string;
  flip?: boolean;
};

export function LiquidDivider({ className, flip = false }: LiquidDividerProps) {
  return (
    <div className={cn("relative h-10 overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("h-full w-full", flip && "rotate-180")}
      >
        <path
          d="M0,48 C150,88 270,2 420,40 C570,78 710,10 860,40 C1010,70 1080,102 1200,60 L1200,120 L0,120 Z"
          fill="rgba(122,161,103,0.16)"
        />
        <path
          d="M0,66 C160,108 280,24 430,58 C580,90 740,26 900,54 C1040,78 1125,104 1200,74 L1200,120 L0,120 Z"
          fill="rgba(255,179,159,0.17)"
        />
      </svg>
    </div>
  );
}
