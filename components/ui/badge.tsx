import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cream",
        className
      )}
    >
      {children}
    </span>
  );
}
