import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-premium-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
